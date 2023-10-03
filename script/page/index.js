/* ***** import utils class & functions ***** */
import { recipes } from "../../data/recipes.js"; // data

import { DisplayData } from "../templates/DisplayData.js"; // displayer
import { SearchEngine } from "../functions/SearchEngine.js"; // global search
import { deployTagsItems } from "../functions/deployTagsItems.js"; // deploy tags selector

/* ***** DOM'S ELMTS ***** */
const mainBar = document.querySelector("#search");

/* ***** essential var ***** */
let tagsBtn = [];
let activatedTags = {
  ingTags: [],
  appTags: [],
  ustTags: [],
};
let ingTagsList = [];
let appTagsList = [];
let ustTagsList = [];

const ingTagsSearch = document.querySelector("#ingTagsSearch");
const appTagsSearch = document.querySelector("#appTagsSearch");
const ustTagsSearch = document.querySelector("#ustTagsSearch");

/* ***** lunch research process ***** */
const search = new SearchEngine(recipes);

/* ***** INIT AND UPDATE DISPLAY ***** */
const displayer = (list) => {
  const displayer = new DisplayData(list);

  displayer.cardsTemplate();

  let { ingList, ustList, appList } = displayer.tagsListCreator();
  displayer.tagsListDisplayer(ingList, ustList, appList, activatedTags);

  ingTagsSearch.value = "";
  appTagsSearch.value = "";
  ustTagsSearch.value = "";

  ingTagsSearch.addEventListener("input", () => {
    let newIngList = [];
    for (let ing in ingList) {
      if (!ingList[ing].includes(ingTagsSearch.value)) {
        delete newIngList[ing];
      } else {
        newIngList.push(ingList[ing]);
        console.log("change");
      }
    }
    displayer.tagsListDisplayer(newIngList, ustList, appList, activatedTags);
    tagsBtn = document.querySelectorAll("button.tag");
    tags(tagsBtn);
  });

  appTagsSearch.addEventListener("input", () => {
    let newAppList = [];
    for (let app in appList) {
      if (!appList[app].includes(appTagsSearch.value)) {
        delete newAppList[app];
      } else {
        newAppList.push(appList[app]);
      }
    }
    displayer.tagsListDisplayer(ingList, ustList, newAppList, activatedTags);
    tagsBtn = document.querySelectorAll("button.tag");
    tags(tagsBtn);
  });

  ustTagsSearch.addEventListener("input", () => {
    /* ***** create a new list to avoid destructuration ***** */
    let newUstList = [];
    for (let ust in ustList) {
      if (!ustList[ust].includes(ustTagsSearch.value)) {
        delete newUstList[ust];
      } else {
        newUstList.push(ustList[ust]);
      }
    }
    displayer.tagsListDisplayer(ingList, newUstList, appList, activatedTags);
    tagsBtn = document.querySelectorAll("button.tag");
    tags(tagsBtn);
  });

  tagsBtn = document.querySelectorAll("button.tag");
  tags(tagsBtn);
};

/* ***** callback utils search methods ***** */
const globalSearch = () => {
  let newList = recipes;

  const userInput = mainBar.value.trim().toLowerCase();

  if (userInput.length > 2) {
    newList = search.inputSearch(userInput);
  }

  if (
    ingTagsList.length > 0 ||
    appTagsList.length > 0 ||
    ustTagsList.length > 0
  ) {
    newList = search.tagsSearch(activatedTags, newList);
  }

  displayer(newList);
};

/* ***** mainbar research ***** */
mainBar.addEventListener("input", globalSearch);

/* ***** tagsBar controler ***** */
const untag = () => {
  const tagsContainer = document.querySelector("#tagsContainer");
  if (
    activatedTags.ingTags.length > 0 ||
    activatedTags.appTags.length > 0 ||
    activatedTags.ustTags.length > 0
  ) {
    tagsContainer.innerHTML = "";
    for (const tag of activatedTags.ingTags) {
      const activeTagBtn = document.createElement("button");
      activeTagBtn.setAttribute("class", "untag");
      activeTagBtn.setAttribute("data-tag", tag);
      activeTagBtn.setAttribute("data-tagtype", "ing");
      activeTagBtn.innerHTML = `${tag} <i class="fa-solid fa-xmark"></i>`;
      tagsContainer.appendChild(activeTagBtn);
    }
    for (const tag of activatedTags.appTags) {
      const activeTagBtn = document.createElement("button");
      activeTagBtn.setAttribute("class", "untag");
      activeTagBtn.setAttribute("data-tag", tag);
      activeTagBtn.setAttribute("data-tagtype", "app");
      activeTagBtn.innerHTML = `${tag} <i class="fa-solid fa-xmark"></i>`;
      tagsContainer.appendChild(activeTagBtn);
    }
    for (const tag of activatedTags.ustTags) {
      const activeTagBtn = document.createElement("button");
      activeTagBtn.setAttribute("class", "untag");
      activeTagBtn.setAttribute("data-tag", tag);
      activeTagBtn.setAttribute("data-tagtype", "ust");
      activeTagBtn.innerHTML = `${tag} <i class="fa-solid fa-xmark"></i>`;
      tagsContainer.appendChild(activeTagBtn);
    }
  } else {
    tagsContainer.innerHTML = "";
  }

  const untagBtn = document.querySelectorAll(".untag");

  for (const btn of untagBtn) {
    btn.addEventListener("click", () => {
      if (btn.dataset.tagtype === "ing") {
        for (const ingTag in ingTagsList) {
          if (btn.dataset.tag === ingTagsList[ingTag]) {
            ingTagsList.splice(ingTag, 1);
          }
        }
      } else if (btn.dataset.tagtype === "app") {
        for (const appTag in appTagsList) {
          if (btn.dataset.tag === appTagsList[appTag]) {
            appTagsList.splice(appTag, 1);
          }
        }
      } else if (btn.dataset.tagtype === "ust") {
        for (const ustTag in ustTagsList) {
          if (btn.dataset.tag === ustTagsList[ustTag]) {
            ustTagsList.splice(ustTag, 1);
          }
        }
      }
      activatedTags = {
        ingTags: ingTagsList,
        appTags: appTagsList,
        ustTags: ustTagsList,
      };
      globalSearch();
      btn.remove();
    });
  }
};

/* ***** tags selector controler ***** */
const tags = (tagsBtn) => {
  for (let index = 0; index < tagsBtn.length; index++) {
    const tagBtn = tagsBtn[index];
    tagBtn.addEventListener("click", () => {
      if (tagBtn.dataset.active === "false") {
        tagBtn.dataset.active = "true";
        if (tagBtn.dataset.tagtype === "ing") {
          ingTagsList.push(tagBtn.dataset.tag);
        } else if (tagBtn.dataset.tagtype === "app") {
          appTagsList.push(tagBtn.dataset.tag);
        } else if (tagBtn.dataset.tagtype === "ust") {
          ustTagsList.push(tagBtn.dataset.tag);
        }
      } else {
        tagBtn.dataset.active = "false";
        if (tagBtn.dataset.tagtype === "ing") {
          for (const ingTag in ingTagsList) {
            if (tagBtn.dataset.tag === ingTagsList[ingTag]) {
              ingTagsList.splice(ingTag, 1);
            }
          }
        } else if (tagBtn.dataset.tagtype === "app") {
          for (const appTag in appTagsList) {
            if (tagBtn.dataset.tag === appTagsList[appTag]) {
              appTagsList.splice(appTag, 1);
            }
          }
        } else if (tagBtn.dataset.tagtype === "ust") {
          for (const ustTag in ustTagsList) {
            if (tagBtn.dataset.tag === ustTagsList[ustTag]) {
              ustTagsList.splice(ustTag, 1);
            }
          }
        }
      }
      activatedTags = {
        ingTags: ingTagsList,
        appTags: appTagsList,
        ustTags: ustTagsList,
      };
      globalSearch();
      untag();
    });
  }
};

tags(tagsBtn);
displayer(recipes);
deployTagsItems();
