export class SearchEngine {
  constructor(list) {
    this.list = list;
  }

  inputSearch(inputValue) {
    /* ***** create a new list to avoid destructuration ***** */
    let newList = [];

    for (const recipe of this.list) {
      let recipeName = recipe.name.toLowerCase();
      let recipeDesc = recipe.description.toLowerCase();

      if (recipeName.includes(inputValue)) {
        newList.push(recipe);
      } else if (recipeDesc.includes(inputValue)) {
        newList.push(recipe);
      } else {
        for (const elmt of recipe.ingredients) {
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

    for (const tag of activatedTags.appTags) {
      newList = newList.filter((recipe) => {
        return recipe.appliance.toLowerCase() === tag ? true : false;
      });
    }

    for (const tag of activatedTags.ingTags) {
      newList = newList.filter((recipe) => {
        let returnBool = false;
        for (const elmt of recipe.ingredients) {
          if (elmt.ingredient.toLowerCase() === tag) {
            returnBool = true;
          }
        }
        return returnBool;
      });
    }

    for (const tag of activatedTags.ustTags) {
      newList = newList.filter((recipe) => {
        let returnBool = false;
        for (const elmt of recipe.ustensils) {
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
