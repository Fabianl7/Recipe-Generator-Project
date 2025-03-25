// console.log('hello world');

// const { readFile, readFileSync } = require('fs');

// const txt = readFileSync('./hello.txt', 'utf-8');

// console.log(txt)
// console.log('do this')

async function getRecipes() {
    const ingredient = document.getElementById("ingredientInput").value;
    if (!ingredient) {
        alert("Please enter an ingredient!");
        return;
    }

    const response = await fetch(`/api/recipes?ingredient=${ingredient}`);
    const data = await response.json();

    const resultsDiv = document.getElementById("recipeResults");
    resultsDiv.innerHTML = "";  // Clear previous results

    if (data.length === 0) {
        resultsDiv.innerHTML = "<p>No recipes found.</p>";
        return;
    }

    data.forEach(recipe => {
        const recipeDiv = document.createElement("div");
        recipeDiv.classList.add("recipe");

        recipeDiv.innerHTML = `
            <h3>${recipe.title}</h3>
            <img src="${recipe.image}" alt="${recipe.title}">
            <p><a href="https://spoonacular.com/recipes/${recipe.title.replace(/ /g, "-")}-${recipe.id}" target="_blank">View Recipe</a></p>
        `;
        resultsDiv.appendChild(recipeDiv);
    });
}

