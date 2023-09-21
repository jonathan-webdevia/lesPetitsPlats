export const globalSearch = (list, searchElmt) => {
  
  console.clear();

  const newList = list.filter((elmt) => {
    if (
      /* ***** search among desired elmts ***** */
      elmt.name.toLowerCase().includes(searchElmt.toLowerCase()) ||
      elmt.description.toLowerCase().includes(searchElmt.toLowerCase()) ||
      elmt.ingredients.forEach((item) => {
        item.ingredient.toLowerCase().includes(searchElmt.toLowerCase());
      })
    ) {
      return true;
    } else {
      return false;
    }
  });
  return newList;
};
