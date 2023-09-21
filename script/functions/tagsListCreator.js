const tagsListCreator = (list) => {
  /* ***** DOM's elements ***** */
  const ingList = document.querySelector(".ingList");
  const appList = document.querySelector(".appList");
  const ustList = document.querySelector(".ustList");

  /* ***** tags results list ***** */
  let ingredientsList = [];
  let applianceList = [];
  let ustensilsList = [];

  list.forEach((element) => {
    /* ***** ingredients tags list ***** */
    element.ingredients.forEach((ing) => {
      if (!ingredientsList.includes(ing.ingredient.toLowerCase())) {
        ingredientsList.push(ing.ingredient.toLowerCase());
      }
    });

    /* ***** appliance tags list ***** */
    if (!applianceList.includes(element.appliance.toLowerCase())) {
      applianceList.push(element.appliance.toLowerCase());
    }

    /* ***** ustencils tags list ***** */
    element.ustensils.forEach((ust) => {
      if (!ustensilsList.includes(ust)) {
        ustensilsList.push(ust);
      }
    });
  });

  /* ***** update DOM's taglist ***** */
  ingList.innerHTML = "";
  ingredientsList.forEach((ingredient) => {
    const listItem = document.createElement("li");
    const button = document.createElement("button");
    button.setAttribute("data-tagtype", "ing");
    button.setAttribute("data-tag", ingredient);
    button.setAttribute("type", "button");
    button.setAttribute("class", ingredient.split(/\s+/).join());
    button.classList.add("tag");
    button.textContent = ingredient;
    listItem.appendChild(button);
    ingList.appendChild(listItem);
  });

  appList.innerHTML = "";
  applianceList.forEach((appliance) => {
    const listItem = document.createElement("li");
    const button = document.createElement("button");
    button.setAttribute("data-tagtype", "app");
    button.setAttribute("data-tag", appliance);
    button.setAttribute("type", "button");
    button.setAttribute("class", appliance.split(/\s+/).join());
    button.classList.add("tag");
    button.textContent = appliance;
    listItem.appendChild(button);
    appList.appendChild(listItem);
  });

  ustList.innerHTML = "";
  ustensilsList.forEach((ustensil) => {
    const listItem = document.createElement("li");
    const button = document.createElement("button");
    button.setAttribute("data-tagtype", "ust");
    button.setAttribute("data-tag", ustensil);
    button.setAttribute("type", "button");
    button.setAttribute("class", ustensil.split(/\s+/).join());
    button.classList.add("tag");
    button.textContent = ustensil;
    listItem.appendChild(button);
    ustList.appendChild(listItem);
  });

  return { ingredientsList, applianceList, ustensilsList };
};

const tagsDisplayer = (bool, data) => {
  const tagsContainer = document.querySelector("#tagsContainer");
  const tagsSelector = document.querySelectorAll(".tag");
  if (bool) {
    const button = document.createElement("button");
    button.textContent = data;
    button.setAttribute("class", "untag");
    button.classList.add(data.split(/\s+/).join());
    button.setAttribute("data-tag", data);
    tagsContainer.appendChild(button);
  } else {
    const btnList = tagsContainer.childNodes;
    btnList.forEach((btn) => {
      if (btn.classList.contains(data.split(/\s+/).join())) {
        btn.remove();
      }
    });
  }
  const tagsBtns = document.querySelectorAll(".untag");
  tagsBtns.forEach((tagBtn) => {
    tagBtn.addEventListener("click", () => {
      tagsSelector.forEach((btn) => {
        if (btn.classList.contains(tagBtn.dataset.tag.split(/\s+/).join())) {
          btn.classList.remove("active");
        }
      });
      tagBtn.remove();
    });
  });
};

const tagsSelector = () => {
  /* ***** Select * btns ***** */
  const tagBtns = document.querySelectorAll(".tag");

  tagBtns.forEach((tagBtn) => {
    tagBtn.addEventListener("click", () => {
      const list = tagBtn.closest("ul");
      const item = tagBtn.closest("li");

      if (!tagBtn.classList.contains("active")) {
        tagBtn.classList.add("active");
        item.remove();
        list.prepend(item);
        tagsDisplayer(true, tagBtn.dataset.tag);
      } else {
        tagBtn.classList.remove("active");
        tagsDisplayer(false, tagBtn.dataset.tag);
      }
    });
  });
};

export { tagsListCreator, tagsSelector };
