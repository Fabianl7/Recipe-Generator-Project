# 🍳 Recipe Generator Project

A web application that allows users to search for recipes based on ingredients using the Spoonacular API.

Built with Node.js, Express, EJS, and fetch. Deployed on Heroku.

---

## 📁 Project Structure

```
RecipeGeneratorProject/
├── public/            # Static assets
│   ├── styles.css
│   └── index.js
│   └── home.html
├── .env               # Environment variables (NOT committed)
├── .gitignore
├── package.json
├── package-lock.json
├── server.js          # Express server
├── test.js
├── Procfile
├── README.md
```

---

## 🚀 Features

- Enter an ingredient to get a list of recipes from the Spoonacular API.
- Responsive UI with basic styling.
- Deployed and testable on Heroku.
- Unit tests with Jest.

---

## 🔧 Getting Started (Local Development)

### 1. **Clone the Repository**
```bash
git clone https://github.com/your-username/Recipe-Generator-Project.git
cd Recipe-Generator-Project
```

### 2. **Install Dependencies**
```bash
npm install
```

### 3. **Set Up Environment Variables**

Create a `.env` file in the root of the project with the following:

```
API_KEY=your_spoonacular_api_key
```

> 🔐 **Never commit `.env` to GitHub.**

### 4. **Start the Server**
```bash
npm start
```

Then open: [http://localhost:3000](http://localhost:3000)

---

## ☁️ Deploying to Heroku

### 1. **Create Heroku App**
```bash
heroku login
heroku create your-app-name
```

### 2. **Set Environment Variable on Heroku**
```bash
heroku config:set API_KEY=your_spoonacular_api_key
```

### 3. **Push Code to Heroku**
```bash
git push heroku main
```

### 4. **Open the App**
```bash
heroku open
```

---

## ✅ Running Tests

Tests use [Jest](https://jestjs.io/).

To run tests:

```bash
npm test
```

---

## 🧠 Notes for Team

- Make sure your `.env` file is correctly configured locally.
- Do **not** push `.env` to GitHub.
- If you make changes, always push to both:
  ```bash
  git push origin main   # Push to GitHub
  git push heroku main   # Deploy to Heroku
  ```

---

## 💡 Credits

Made by Team [Your Team Name Here] for CIS 4004 - Spring 2025 💻
