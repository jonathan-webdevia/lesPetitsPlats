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
    let newIngList = ingList;
    newIngList = ingList.filter((tag) => {
      return tag.includes(ingTagsSearch.value) ? true : false;
    });
    displayer.tagsListDisplayer(newIngList, ustList, appList, activatedTags);
    tagsBtn = document.querySelectorAll("button.tag");
    tags(tagsBtn);
  });

  appTagsSearch.addEventListener("input", () => {
    let newAppList = appList;
    newAppList = appList.filter((tag) => {
      return tag.includes(appTagsSearch.value) ? true : false;
    });
    displayer.tagsListDisplayer(ingList, ustList, newAppList, activatedTags);
    tagsBtn = document.querySelectorAll("button.tag");
    tags(tagsBtn);
  });

  ustTagsSearch.addEventListener("input", () => {
    let newUstList = ustList;
    newUstList = ustList.filter((tag) => {
      return tag.includes(ustTagsSearch.value) ? true : false;
    });
    displayer.tagsListDisplayer(ingList, newUstList, appList, activatedTags);
    tagsBtn = document.querySelectorAll("button.tag");
    tags(tagsBtn);
  });

  tagsBtn = document.querySelectorAll("button.tag");
  tags(tagsBtn);
};

/* ***** callback utils search methods ***** */
const globalSearch = () => {
  console.clear();
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
    activatedTags.ingTags.forEach((tag) => {
      const activeTagBtn = document.createElement("button");
      activeTagBtn.setAttribute("class", "untag");
      activeTagBtn.setAttribute("data-tag", tag);
      activeTagBtn.setAttribute("data-tagtype", "ing");
      activeTagBtn.innerHTML = `${tag} <i class="fa-solid fa-xmark"></i>`;
      tagsContainer.appendChild(activeTagBtn);
    });
    activatedTags.appTags.forEach((tag) => {
      const activeTagBtn = document.createElement("button");
      activeTagBtn.setAttribute("class", "untag");
      activeTagBtn.setAttribute("data-tag", tag);
      activeTagBtn.setAttribute("data-tagtype", "app");
      activeTagBtn.innerHTML = `${tag} <i class="fa-solid fa-xmark"></i>`;
      tagsContainer.appendChild(activeTagBtn);
    });
    activatedTags.ustTags.forEach((tag) => {
      const activeTagBtn = document.createElement("button");
      activeTagBtn.setAttribute("class", "untag");
      activeTagBtn.setAttribute("data-tag", tag);
      activeTagBtn.setAttribute("data-tagtype", "ust");
      activeTagBtn.innerHTML = `${tag} <i class="fa-solid fa-xmark"></i>`;
      tagsContainer.appendChild(activeTagBtn);
    });
  } else {
    tagsContainer.innerHTML = "";
  }

  const untagBtn = document.querySelectorAll(".untag");

  untagBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.dataset.tagtype === "ing") {
        ingTagsList = ingTagsList.filter((tag) => {
          return btn.dataset.tag != tag ? true : false;
        });
      } else if (btn.dataset.tagtype === "app") {
        appTagsList = appTagsList.filter((tag) => {
          return btn.dataset.tag != tag ? true : false;
        });
      } else if (btn.dataset.tagtype === "ust") {
        ustTagsList = ustTagsList.filter((tag) => {
          return btn.dataset.tag != tag ? true : false;
        });
      }
      activatedTags = {
        ingTags: ingTagsList,
        appTags: appTagsList,
        ustTags: ustTagsList,
      };
      globalSearch();
      btn.remove();
    });
  });
};

/* ***** tags selector controler ***** */
const tags = (tagsBtn) => {
  tagsBtn.forEach((tagBtn) => {
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
          ingTagsList = ingTagsList.filter((tag) => {
            return tagBtn.dataset.tag != tag ? true : false;
          });
        } else if (tagBtn.dataset.tagtype === "app") {
          appTagsList = appTagsList.filter((tag) => {
            return tagBtn.dataset.tag != tag ? true : false;
          });
        } else if (tagBtn.dataset.tagtype === "ust") {
          ustTagsList = ustTagsList.filter((tag) => {
            return tagBtn.dataset.tag != tag ? true : false;
          });
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
  });
};

tags(tagsBtn);
displayer(recipes);
deployTagsItems();
