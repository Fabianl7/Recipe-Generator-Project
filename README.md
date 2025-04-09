# Recipe Generator

A full-stack web app that allows users to log in with Google and search for recipes based on ingredients using the Spoonacular API.

---

## 🌐 Live Demo

Visit the app here:  
https://cis4004-recipe-generator-b6cd2b2ee84e.herokuapp.com

---

## 🛠 Tech Stack

| Layer                | Tech Used                                      |
|----------------------|------------------------------------------------|
| Front-End            | HTML, CSS, Vanilla JavaScript                  |
| HTTP Server          | Node.js with Express.js                        |
| Database             | MongoDB Atlas (with Mongoose)                  |
| Authentication       | Google OAuth 2.0 (via Passport.js)             |
| External API         | Spoonacular Recipe API                         |
| Deployment Platform  | Heroku                                         |

---

## 🚀 Features

- Users can log in using Google
- Logged-in users can search for recipes by ingredient
- Results fetched live from Spoonacular API
- User sessions are managed using Passport
- MongoDB used to store authenticated users
- Clean UI with disabled functionality for guests

---

## ⚙️ How to Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/your-username/Recipe-Generator-Project.git
cd Recipe-Generator-Project
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file in the root directory:

```
API_KEY=your_spoonacular_api_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
SESSION_SECRET=any_random_string
MONGO_URI=your_mongodb_atlas_connection_string
```

> ⚠️ For Google OAuth, make sure you've added these redirect URIs in the Google Cloud Console:
>
> - http://localhost:3000/auth/google/callback
> - https://your-heroku-app.herokuapp.com/auth/google/callback

### 4. Start the server

```bash
npm start
```

Then open:  
http://localhost:3000

---

## ☁️ Deploying to Heroku

### 1. Push code to Heroku

```bash
git add .
git commit -m "Deploying"
git push heroku main
```

### 2. Set environment variables on Heroku

```bash
heroku config:set API_KEY=your_spoonacular_api_key
heroku config:set GOOGLE_CLIENT_ID=your_google_client_id
heroku config:set GOOGLE_CLIENT_SECRET=your_google_client_secret
heroku config:set SESSION_SECRET=any_random_string
heroku config:set MONGO_URI=your_mongodb_atlas_connection_string
```

### 3. Allow Heroku IPs to access MongoDB Atlas

In MongoDB Atlas → Network Access → IP Access List:  
Add this IP rule:
```
0.0.0.0/0
```

Then:
```bash
heroku open
```

 
YouTube Demo: [link once available]

---

## 🤖 AI Usage Disclosure

This project used the following AI tools during development and documentation:

- ChatGPT (OpenAI GPT-4)
  - Assisted in setup for OAuth 2.0, and writing the CSS

---

## ✅ Project Requirements Covered

| Requirement                          | Implementation                            |
|--------------------------------------|--------------------------------------------|
| Web-based Interface via HTTP Server  | Express.js server + public HTML            |
| Persistent Database                  | MongoDB Atlas + Mongoose                   |
| External API                         | Spoonacular Recipe API                     |
| Third-Party Authentication           | Google OAuth 2.0 via Passport.js           |

