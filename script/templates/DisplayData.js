export class DisplayData {
  constructor(recipe) {
    this.name = recipe.name;
  }

  cardsTemplate() {
    /* ***** creation of DOM's elements ***** */
    const article = document.createElement("article");
    const recipeTitle = document.createElement("h2");
    recipeTitle.textContent = this.name;
    article.appendChild(recipeTitle)

    return article;
  }
}
