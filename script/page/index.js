import { recipes } from "../../data/recipes.js";

const inputSearch = document.querySelector("#search");

const recipesContainer = document.querySelector(".recipesContainer");

const displayRecipeEngine = (recipeList) => {
  recipesContainer.innerHTML = "";
  recipeList.forEach((recipe) => {
    const title = document.createElement("h2");
    title.textContent = recipe.name;
    const description = document.createElement("p");
    description.innerText = recipe.description;
    const ingList = document.createElement("ul");
    recipe.ingredients.forEach((ingredient) => {
      const item = document.createElement("li");
      item.innerText = ingredient.ingredient;
      ingList.appendChild(item);
    });
    recipesContainer.appendChild(title);
    recipesContainer.appendChild(description);
    recipesContainer.appendChild(ingList);
  });
};

const globalSearch = async (userInput) => {
  /* console.clear();
  console.log(userInput);
  const regex = new RegExp(`${userInput.toLowerCase()}`);
  console.log(regex); */

  console.clear();

  let recipeDisplay = [];
  let ingredientsList = [];
  let applianceList = [];
  let ustencilsList = [];

  recipeDisplay = recipes.filter((recipe) => {
    if (
      recipe.name.toLowerCase().includes(userInput.toLowerCase()) ||
      recipe.description.toLowerCase().includes(userInput.toLowerCase()) ||
      recipe.ingredients.some((ing) =>
        ing.ingredient.toLowerCase().includes(userInput)
      )
    ) {
      if (!applianceList.includes(recipe.appliance.toLowerCase())) {
        applianceList.push(recipe.appliance.toLowerCase());
      }
      recipe.ustensils.forEach((ustensil) => {
        if (!ustencilsList.includes(ustensil.toLowerCase())) {
          ustencilsList.push(ustensil.toLowerCase());
        }
      });
      recipe.ingredients.forEach((elmt) => {
        if (!ingredientsList.includes(elmt.ingredient.toLowerCase())) {
          ingredientsList.push(elmt.ingredient.toLowerCase());
        }
      });
      const ingList = document.querySelector(".tagsBar .ingList");
      ingList.innerHTML = "";
      ingredientsList.forEach((ingredient) => {
        const item = document.createElement("li");
        item.textContent = ingredient;
        ingList.appendChild(item);
      })
      return true;
    } else {
      return false;
    }
  });

  console.log(ingredientsList);

  displayRecipeEngine(recipeDisplay);
};

inputSearch.addEventListener("input", () => {
  if (inputSearch.value.length > 2) {
    globalSearch(inputSearch.value);
  } else {
    displayRecipeEngine(recipes);
  }
});

displayRecipeEngine(recipes);

const labelSelector = document.querySelectorAll(".tagsBar .tagSelector .label");

const deployTagsItems = (label) => {
  label.addEventListener("click", () => {
    const tagSelector = label.closest(".tagSelector");
    const itemsList = tagSelector.children[1];
    if (!itemsList.classList.contains("active")) {
      itemsList.classList.remove("unactive");
      itemsList.classList.add("active");
      label.classList.remove("unactive");
      label.classList.add("active");
    } else {
      itemsList.classList.remove("active");
      itemsList.classList.add("unactive");
      label.classList.remove("active");
      label.classList.add("unactive");
    }
  });
};

labelSelector.forEach((label) => {
  deployTagsItems(label);
});