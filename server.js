import "dotenv/config";
console.log("✅ Loaded API KEY:", process.env.API_KEY);
import express from "express";
import fetch from "node-fetch"; // ✅ Native fetch for Node.js 18+
import path from "path";
import { fileURLToPath } from "url";
import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import session from "express-session";
import mongoose from "mongoose";
import User from "./models/User.js";

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;
const users = {};

// ===== MongoDB Connection =====
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("MongoDB connection error:", err));

// ===== Passport Config =====
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "https://cis4004-recipe-generator-b6cd2b2ee84e.herokuapp.com/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let existingUser = await User.findOne({ googleId: profile.id });
    if (existingUser) return done(null, existingUser);

    const newUser = await User.create({
      googleId: profile.id,
      name: profile.displayName,
      email: profile.emails[0].value,
    });

    done(null, newUser);
  } catch (err) {
    done(err, null);
  }
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// ===== Express Config =====
// Fix for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static("public"));
app.use(express.json());

// ===== Routes =====
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home.html"));
});

// Google OAuth Routes
app.get("/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get("/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/"); // Redirect on success
  }
);

app.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

// Recipe API route
app.get("/api/recipes", async (req, res) => {
  const ingredient = req.query.ingredient;
  if (!ingredient) return res.status(400).json({ error: "Ingredient required" });

  const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredient}&number=5&apiKey=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
});

app.get("/api/user", (req, res) => {
    if (req.user) {
      res.json({ loggedIn: true, name: req.user.name, email: req.user.email });
    } else {
      res.json({ loggedIn: false });
    }
  });
  

// ===== Start Server =====
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
