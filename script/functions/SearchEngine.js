export class SearchEngine {
  constructor(list) {
    this.list = list;
  }

  globalSearch(input) {
    const inputValue = input.value.trim().toLowerCase();
    const newlist = this.list.filter((recipe) => {
      let result = false;
      if (recipe.name.toLowerCase().includes(inputValue)) {
        result = true;
      } else if (recipe.description.toLowerCase().includes(inputValue)) {
        result = true;
      } else {
        recipe.ingredients.forEach((elmt) => {
          if (elmt.ingredient.toLowerCase().includes(inputValue)) {
            result = true;
          }
        });
      }
      return result;
    });
    return newlist;
  }

  tagsListCreator(recipes) {
    let ingredientsList = [];
    let applianceList = [];
    let ustensilsList = [];
    recipes.forEach((elmt) => {
      elmt.ingredients.forEach((ing) => {
        if (!ingredientsList.includes(ing.ingredient.toLowerCase()))
          ingredientsList.push(ing.ingredient.toLowerCase());
      });
      if (!applianceList.includes(elmt.appliance.toLowerCase())) {
        applianceList.push(elmt.appliance.toLowerCase());
      }
      elmt.ustensils.forEach((ust) => {
        if (!ustensilsList.includes(ust.toLowerCase())) {
          ustensilsList.push(ust.toLowerCase());
        }
      });
    });
    return { ingredientsList, applianceList, ustensilsList };
  }

  tagsSearch(tagsList) {
    let newList = this.list;
    tagsList.ingredientTags.forEach((tagElmt) => {
      newList = newList.filter((recipe) => {
        let result = false;
        recipe.ingredients.forEach((elmt) => {
          if (elmt.ingredient.toLowerCase() === tagElmt) {
            result = true;
          }
        });
        return result;
      });
    });

    tagsList.applianceTags.forEach((tagElmt) => {
      newList = newList.filter((recipe) => {
        let result = false;
        if (recipe.appliance.toLowerCase() === tagElmt) {
          result = true;
        }
        return result;
      });
    });

    tagsList.ustensilTags.forEach((tagElmt) => {
      newList = newList.filter((recipe) => {
        let result = false;
        recipe.ustensils.forEach((ustensil) => {
          if (ustensil.toLowerCase() === tagElmt) {
            result = true;
          }
        });
        return result;
      });
    });
    return newList;
  }
}
