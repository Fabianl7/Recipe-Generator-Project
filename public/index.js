let isLoggedIn = false;

window.addEventListener("DOMContentLoaded", async () => {
  const res = await fetch("/api/user");
  const data = await res.json();
  isLoggedIn = data.loggedIn;

  const input = document.getElementById("ingredientInput");
  const button = document.getElementById("searchBtn");
  const authDiv = document.getElementById("authStatus");

  if (isLoggedIn) {
    input.disabled = false;
    button.disabled = false;
    authDiv.innerHTML = `
      ✅ Logged in as ${data.name} (${data.email}) 
      <a href="/logout">Logout</a>
    `;
  } else {
    input.disabled = true;
    button.disabled = true;
    authDiv.innerHTML = `
      ❌ Not logged in 
      <a href="/auth/google">Login with Google</a>
    `;
  }

  // ✅ Use event listener instead of onclick attribute
  button.addEventListener("click", async () => {
    console.log("🔍 Button clicked!");
    if (!isLoggedIn) {
      alert("Please log in to search for recipes.");
      return;
    }

    const ingredient = input.value.trim();
    if (!ingredient) {
      alert("Please enter an ingredient!");
      return;
    }

    const resultsDiv = document.getElementById("recipeResults");
    resultsDiv.innerHTML = "<p class='loading'>Loading recipes...</p>";

    try {
      const response = await fetch(`/api/recipes?ingredient=${ingredient}`);
      const data = await response.json();

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
    } catch (err) {
      resultsDiv.innerHTML = "<p>Something went wrong while fetching recipes.</p>";
    }
  });
});
