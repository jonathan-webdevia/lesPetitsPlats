export class SearchEngine {
  constructor(list) {
    this.list = list;
  }
  inputSearch(inputValue) {
    let newList = this.list;
    newList = this.list.filter((recipe) => {
      let returnBool = false;

      let recipeName = recipe.name.toLowerCase();
      let recipeDesc = recipe.description.toLowerCase();

      if (recipeName.includes(inputValue)) {
        returnBool = true;
      } else if (recipeDesc.includes(inputValue)) {
        returnBool = true;
      } else {
        recipe.ingredients.forEach((elements) => {
          if (elements.ingredient.toLowerCase() === inputValue) {
            returnBool = true;
          }
        });
      }
      return returnBool;
    });
    return newList;
  }
  tagsSearch(activatedTags, list) {
    let newList = list;
    activatedTags.appTags.forEach((tag) => {
      newList = newList.filter((recipe) => {
        return recipe.appliance.toLowerCase() === tag ? true : false;
      });
    });

    activatedTags.ingTags.forEach((tag) => {
      newList = newList.filter((recipe) => {
        let returnBool = false;
        recipe.ingredients.forEach((elmt) => {
          if (elmt.ingredient.toLowerCase() === tag) {
            returnBool = true;
          }
        });
        return returnBool;
      });
    });

    activatedTags.ustTags.forEach((tag) => {
      newList = newList.filter((recipe) => {
        let returnBool = false;
        recipe.ustensils.forEach((ustensil) => {
          if (ustensil.toLowerCase() === tag) {
            returnBool = true;
          }
        });
        return returnBool;
      });
    });

    return newList;
  }
}
