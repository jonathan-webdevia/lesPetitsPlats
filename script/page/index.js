/* ***** import utils functions ***** */
import { recipes } from "../../data/recipes.js";
import { globalSearch } from "../functions/globalSearch.js";
import { tagsListCreator, tagsSelector } from "../functions/tagsListCreator.js";
import { deployTagsItems } from "../functions/deployTagsItems.js";

/* ***** import utils class ***** */
import { DisplayData } from "../templates/DisplayData.js";

/* ***** DOM's elements ***** */
const inputSearch = document.querySelector("#search");
const recipesContainer = document.querySelector(".recipesContainer");

/* ***** create utils variables ***** */
let displayIt = [];
let ingredientsList = [];
let applianceList = [];
let ustensilsList = [];

const initialization = () => {
  /* ***** array list affectation & call of template ***** */
  displayIt = recipes;
  recipesContainer.innerHTML = "";
  displayIt.forEach((recipe) => {
    const displayTemplate = new DisplayData(recipe);
    const article = displayTemplate.cardsTemplate();
    recipesContainer.appendChild(article);
  });

  /* ***** tags list affectation ***** */
  ingredientsList = tagsListCreator(displayIt).ingredientsList;
  applianceList = tagsListCreator(displayIt).applianceList;
  ustensilsList = tagsListCreator(displayIt).ustensilsList;

  const tagSelectorEngine = tagsSelector();
};

inputSearch.addEventListener("input", () => {
  /* ***** lunch research only if + 3 charac ***** */
  if (inputSearch.value.length >= 3) {
    /* ***** array list affectation & call of template ***** */
    displayIt = globalSearch(recipes, inputSearch.value);
    recipesContainer.innerHTML = "";
    displayIt.forEach((recipe) => {
      const displayTemplate = new DisplayData(recipe);
      const article = displayTemplate.cardsTemplate();
      recipesContainer.appendChild(article);
    });

    /* ***** tags list affectation ***** */
    ingredientsList = tagsListCreator(displayIt).ingredientsList;
    applianceList = tagsListCreator(displayIt).applianceList;
    ustensilsList = tagsListCreator(displayIt).ustensilsList;

    const tagSelectorEngine = tagsSelector();
  } else {
    initialization();
  }
});

/* ***** tags engine section ***** */
const tagsLabel = document.querySelectorAll("#tagsBar .tagSelector .label");
tagsLabel.forEach((label) => {
  deployTagsItems(label);
})

initialization();
