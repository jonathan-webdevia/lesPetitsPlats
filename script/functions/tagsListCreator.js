import { globalSearch, tagsSearch } from "./SearchEngine.js";

const tagsListCreator = (list) => {
  console.log(list)
  /* ***** tags results list ***** */
  let ingredientsList = [];
  let applianceList = [];
  let ustensilsList = [];

  list.forEach((element) => {
    console.log(element);
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
    console.log(element);
  });

  return { ingredientsList, applianceList, ustensilsList };
};

const tagsDisplayer = (bool, data, datatype) => {
  const tagsContainer = document.querySelector("#tagsContainer");
  const tagsSelector = document.querySelectorAll(".tag");
  if (bool) {
    const button = document.createElement("button");
    button.innerHTML = `${data}<i class="fa-solid fa-xmark"></i>`;
    button.setAttribute("class", "untag");
    button.classList.add(data.split(/\s+/).join());
    button.setAttribute("data-tag", data);
    button.setAttribute("data-tagtype", datatype);
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

const tagsSelector = (displayIt) => {
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
        tagsDisplayer(true, tagBtn.dataset.tag, tagBtn.dataset.tagtype);
      } else {
        tagBtn.classList.remove("active");
        tagsDisplayer(false, tagBtn.dataset.tag, tagBtn.dataset.tagtype);
      }

      let tagListResearch = document.querySelectorAll(".untag");

      tagListResearch.forEach((btn) => {
        // console.log(btn);
        // console.log(displayIt);
        tagsSearch(displayIt, tagBtn.dataset.tag, tagBtn.dataset.tagtype);
      });
    });
  });
};

export { tagsListCreator, tagsSelector };
