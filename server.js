import "dotenv/config";
import express from "express";
import fetch from "node-fetch"; // ✅ Native fetch for Node.js 18+
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;

// Fix for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files (CSS, JS)
app.use(express.static("public"));
app.use(express.json());

// ✅ Serve home.html for "/"
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "home.html"));
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

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
