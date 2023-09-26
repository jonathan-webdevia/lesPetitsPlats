/* ***** import utils functions ***** */
import { recipes } from "../../data/recipes.js";
import { DisplayData } from "../templates/DisplayData.js";
import { SearchEngine } from "../functions/SearchEngine.js";
import { deployTagsItems } from "../functions/deployTagsItems.js";
import { tagsDisplayer } from "../functions/tagsDisplayer.js";

/* ***** DOM's elements ***** */
const inputSearch = document.querySelector("#search");
const recipeContainer = document.querySelector("#recipesContainer");

let ingTags = [];
let applianceTags = [];
let ustTags = [];
let activatedTags = {
  ingredientTags: ingTags,
  applianceTags: applianceTags,
  ustensilTags: ustTags,
};
let ingredientsList = [];
let applianceList = [];
let ustensilsList = [];

/* ***** MAJ ***** */

const displayResults = (list) => {
  const search = new SearchEngine(list);
  ingredientsList = search.tagsListCreator(list).ingredientsList;
  applianceList = search.tagsListCreator(list).applianceList;
  ustensilsList = search.tagsListCreator(list).ustensilsList;

  const displayData = new DisplayData(list);
  displayData.cardsTemplate(recipeContainer);
  displayData.tagsList(
    ingredientsList,
    applianceList,
    ustensilsList,
    activatedTags
  );

  tagsSelector(list);
};

/* ***** global search event **** */
inputSearch.addEventListener("input", () => {
  if (inputSearch.value.length > 2) {
    const search = new SearchEngine(recipes);
    let recipesList = search.globalSearch(inputSearch);

    displayResults(recipesList);
  } else {
    displayResults(recipes);
  }
});

/* ***** tagsList and tagsSearch ***** */
const tagsSelector = (list) => {
  /* ***** DOM's elmts ***** */
  const ingList = document.querySelector(".ingList");
  const appList = document.querySelector(".appList");
  const ustList = document.querySelector(".ustList");
  const tags = document.querySelectorAll(".tag");

  let recipesList = list;

  tags.forEach((tagBtn) => {
    /* ***** event of tags Btn click ***** */
    tagBtn.addEventListener("click", () => {
      /* ***** DOM's elmts ***** */
      const tagValue = tagBtn.dataset.tag;
      const listElmt = tagBtn.closest("li");

      const search = new SearchEngine(recipesList);

      if (tagBtn.dataset.active === "false") {
        if (tagBtn.dataset.tagtype === "ing") {
          ingTags.push(tagBtn.dataset.tag);
        } else if (tagBtn.dataset.tagtype === "app") {
          applianceTags.push(tagBtn.dataset.tag);
        } else if (tagBtn.dataset.tagtype === "ust") {
          ustTags.push(tagBtn.dataset.tag);
        }

        tagsDisplayer(true, tagBtn);

        activatedTags = {
          ingredientTags: ingTags,
          applianceTags: applianceTags,
          ustensilTags: ustTags,
        };
      } else {
        if (tagBtn.dataset.tagtype === "ing") {
          ingTags = ingTags.filter((tag) => {
            return tag != tagBtn.dataset.tag ? true : false;
          });
        } else if (tagBtn.dataset.tagtype === "app") {
          applianceTags = applianceTags.filter((tag) => {
            return tag != tagBtn.dataset.tag ? true : false;
          });
        } else if (tagBtn.dataset.tagtype === "ust") {
          ustTags = ustTags.filter((tag) => {
            return tag != tagBtn.dataset.tag ? true : false;
          });
        }
        tagsDisplayer(false, tagBtn);
        activatedTags = {
          ingredientTags: ingTags,
          applianceTags: applianceTags,
          ustensilTags: ustTags,
        };
      }
      const results = search.tagsSearch(activatedTags);
      displayResults(results);
    });
  });
};

displayResults(recipes);
deployTagsItems();
