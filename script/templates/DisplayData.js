export class DisplayData {
  constructor(recipes) {
    this.recipes = recipes;
  }

  cardsTemplate(container) {
    container.innerHTML = "";
    this.recipes.forEach((recipe) => {
      /* ***** creation of DOM's elements ***** */
      const article = document.createElement("article");
      const recipeTitle = document.createElement("h2");
      recipeTitle.textContent = recipe.name;
      article.appendChild(recipeTitle);

      container.appendChild(article);
    });
  }

  tagsList(ingredientsList, applianceList, ustensilsList, activatedTags) {
    /* ***** DOM's elements ***** */
    const ingList = document.querySelector(".ingList");
    const appList = document.querySelector(".appList");
    const ustList = document.querySelector(".ustList");

    const btnConstructor = (elmt, elmtType, activatedTagsElmt, list) => {
      const tagBtn = document.querySelectorAll(".tag");
      let active = activatedTagsElmt.includes(elmt.toLowerCase())
        ? true
        : false;
      const listItem = document.createElement("li");
      const button = document.createElement("button");
      button.setAttribute("data-tagtype", elmtType);
      button.setAttribute("data-tag", elmt.toLowerCase());
      button.setAttribute("data-active", active);
      button.setAttribute("type", "button");
      button.classList.add("tag");
      button.textContent = elmt;
      listItem.appendChild(button);

      activatedTagsElmt.includes(elmt)
        ? list.prepend(listItem)
        : list.appendChild(listItem);
    };

    ingList.innerHTML = "";
    ingredientsList.forEach((ingredient) => {
      btnConstructor(ingredient, "ing", activatedTags.ingredientTags, ingList);
    });

    appList.innerHTML = "";
    applianceList.forEach((appliance) => {
      btnConstructor(appliance, "app", activatedTags.applianceTags, appList);
    });

    ustList.innerHTML = "";
    ustensilsList.forEach((ustensil) => {
      btnConstructor(ustensil, "ust", activatedTags.ustensilTags, ustList);
    });
  }
}
