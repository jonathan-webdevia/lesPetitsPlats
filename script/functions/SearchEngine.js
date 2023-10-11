export class SearchEngine {
  constructor(list) {
    this.list = list;
  }

  inputSearch(inputValue) {
    /* ***** create a new list to avoid destructuration ***** */
    let newList = [];

    for (let index = 0; index < this.list.length; index++) {
      const recipe = this.list[index];
      let recipeName = recipe.name.toLowerCase();
      let recipeDesc = recipe.description.toLowerCase();

      if (recipeName.includes(inputValue)) {
        newList.push(recipe);
      } else if (recipeDesc.includes(inputValue)) {
        newList.push(recipe);
      } else {
        for (let index = 0; index < recipe.ingredients.length; index++) {
          const elmt = recipe.ingredients[index];
          if (elmt.ingredient.toLowerCase().includes(inputValue)) {
            newList.push(recipe);
          }
        }
      }
    }
    return newList;
  }

  tagsSearch(activatedTags, list) {
    let newList = list;

    for (let index = 0; index < activatedTags.appTags.length; index++) {
      const tag = activatedTags.appTags[index];
      newList = newList.filter((recipe) => {
        return recipe.appliance.toLowerCase() === tag ? true : false;
      });
    }

    for (let index = 0; index < activatedTags.ingTags.length; index++) {
      const tag = activatedTags.ingTags[index];
      newList = newList.filter((recipe) => {
        let returnBool = false;
        for (let index = 0; index < recipe.ingredients.length; index++) {
          const elmt = recipe.ingredients[index];
          if (elmt.ingredient.toLowerCase() === tag) {
            returnBool = true;
          }
        }
        return returnBool;
      });
    }

    for (let index = 0; index < activatedTags.ustTags.length; index++) {
      const tag = activatedTags.ustTags[index];
      newList = newList.filter((recipe) => {
        let returnBool = false;
        for (let index = 0; index < recipe.ustensils.length; index++) {
          const elmt = recipe.ustensils[index];
          if (elmt.toLowerCase() === tag) {
            returnBool = true;
          }
        }
        return returnBool;
      });
    }

    return newList;
  }
}
