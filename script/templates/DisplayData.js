export class DisplayData {
  constructor(recipes) {
    this.recipes = recipes;
    this.recipesContainer = document.querySelector("#recipesContainer");
    this.nbrRecipesContainer = document.querySelector("#nbrRecipes");
  }

  cardsTemplate() {
    this.recipesContainer.innerHTML = "";
    let nbrRecipesContent = "";
    this.recipes.length > 1
      ? (nbrRecipesContent = `${this.recipes.length} recettes`)
      : (nbrRecipesContent = `${this.recipes.length} recette`);
    this.nbrRecipesContainer.textContent = nbrRecipesContent;

    if (this.recipes.length === 0) {
      const article = document.createElement("article");
      article.textContent = "Aucune recette trouvé, réitérer votre recherche";
      this.recipesContainer.appendChild(article);
    } else {
      for (let index = 0; index < this.recipes.length; index++) {
        const recipe = this.recipes[index];
        /* ***** creation of DOM's elements ***** */
        const article = document.createElement("article");
        article.setAttribute("class", "recipeCard");

        const timer = document.createElement("div");
        timer.setAttribute("class", "timer");
        timer.textContent = `${recipe.time} min`;

        article.appendChild(timer);

        const recipeImg = document.createElement("img");
        let srcImgName = null;

        recipe.id < 10
          ? (srcImgName = `Recette0${recipe.id}.jpg`)
          : (srcImgName = `Recette${recipe.id}.jpg`);

        recipeImg.setAttribute(
          "src",
          `../../assets/photo/recipePhoto/${srcImgName}`
        );

        const recipeDescription = document.createElement("div");
        recipeDescription.setAttribute("class", "recipeDescription");

        const recipeTitle = document.createElement("h1");
        recipeTitle.textContent = recipe.name;

        recipeDescription.appendChild(recipeTitle);

        const recipeText = document.createElement("div");

        const recipeDescTitle = document.createElement("h2");
        recipeDescTitle.textContent = "RECETTE";

        const descriptionContent = document.createElement("p");
        descriptionContent.textContent = `${recipe.description.substring(
          0,
          180
        )}...`;

        recipeText.appendChild(recipeDescTitle);
        recipeText.appendChild(descriptionContent);

        recipeDescription.appendChild(recipeText);

        const recipeIngTitle = document.createElement("h2");
        recipeIngTitle.textContent = "INGREDIENTS";

        recipeDescription.appendChild(recipeIngTitle);

        const ingContainer = document.createElement("div");
        ingContainer.setAttribute("class", "ingContainer");

        for (let index = 0; index < recipe.ingredients.length; index++) {
          const elmt = recipe.ingredients[index];
          const ingBloc = document.createElement("div");
          ingBloc.setAttribute("class", "ingBloc");
          const ingName = document.createElement("strong");
          ingName.style.display = "block";
          ingName.textContent = elmt.ingredient;

          const quantityBloc = document.createElement("p");
          let quantityTxt = null;
          elmt.unit
            ? (quantityTxt = elmt.quantity + " " + elmt.unit)
            : (quantityTxt = elmt.quantity);
          quantityBloc.textContent = quantityTxt;

          ingBloc.appendChild(ingName);
          ingBloc.appendChild(quantityBloc);

          ingContainer.appendChild(ingBloc);
        }

        recipeDescription.appendChild(ingContainer);

        article.appendChild(recipeImg);
        article.appendChild(recipeDescription);

        this.recipesContainer.appendChild(article);
      }
    }
  }

  tagsListCreator() {
    /* ***** create tags list options ***** */
    const ingList = [];
    const ustList = [];
    const appList = [];

    for (let index = 0; index < this.recipes.length; index++) {
      const recipe = this.recipes[index];
      for (let index = 0; index < recipe.ingredients.length; index++) {
        const elmt = recipe.ingredients[index];
        const ing = elmt.ingredient.toLowerCase();

        if (!ingList.includes(ing)) {
          ingList.push(ing);
        }
      }
      for (let index = 0; index < recipe.ustensils.length; index++) {
        const elmt = recipe.ustensils[index];
        const ust = elmt.toLowerCase();
        if (!ustList.includes(ust)) {
          ustList.push(ust);
        }
      }
      const app = recipe.appliance.toLowerCase();
      if (!appList.includes(app)) {
        appList.push(app);
      }
    }

    return { ingList, ustList, appList };
  }

  tagsListDisplayer(ingList, ustList, appList, activatedTags) {
    /* ***** ADD LIST TO THE DOM ***** */
    const ingListDOM = document.querySelector(".ingList");
    const ustListDOM = document.querySelector(".ustList");
    const appListDOM = document.querySelector(".appList");

    ingListDOM.innerHTML = "";
    for (let index = 0; index < ingList.length; index++) {
      const element = ingList[index];
      let active = false;
      if (activatedTags.ingTags.includes(element)) {
        active = true;
      } else {
        active = false;
      }
      const item = document.createElement("li");
      const button = document.createElement("button");
      button.setAttribute("class", "tag");
      button.setAttribute("data-tagtype", "ing");
      button.setAttribute("data-active", active);
      button.setAttribute("data-tag", element);
      button.textContent = element;
      item.appendChild(button);
      active === true ? ingListDOM.prepend(item) : ingListDOM.appendChild(item);
    }

    ustListDOM.innerHTML = "";
    for (let index = 0; index < ustList.length; index++) {
      const element = ustList[index];
      let active = false;
      if (activatedTags.ustTags.includes(element)) {
        active = true;
      } else {
        active = false;
      }
      const item = document.createElement("li");
      const button = document.createElement("button");
      button.setAttribute("class", "tag");
      button.setAttribute("data-active", active);
      button.setAttribute("data-tag", element);
      button.setAttribute("data-tagtype", "ust");
      button.textContent = element;
      item.appendChild(button);
      active === true ? ustListDOM.prepend(item) : ustListDOM.appendChild(item);
    }

    appListDOM.innerHTML = "";
    for (let index = 0; index < appList.length; index++) {
      const element = appList[index];
      let active = false;
      if (activatedTags.appTags.includes(element)) {
        active = true;
      } else {
        active = false;
      }
      const item = document.createElement("li");
      const button = document.createElement("button");
      button.setAttribute("class", "tag");
      button.setAttribute("data-tagtype", "app");
      button.setAttribute("data-active", active);
      button.setAttribute("data-tag", element);
      button.textContent = element;
      item.appendChild(button);
      active === true ? appListDOM.prepend(item) : appListDOM.appendChild(item);
    }
  }
}
