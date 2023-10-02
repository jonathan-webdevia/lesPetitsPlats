export const tagsSearch = (tagsBtn) => {
  let activatedTags = {
    ingTags: [],
    appTags: [],
    ustTags: [],
  };
  let ingTagsList = [];
  let appTagsList = [];
  let ustTagsList = [];
  tagsBtn.forEach((tagBtn) => {
    tagBtn.addEventListener("click", () => {
      if (tagBtn.dataset.active === "false") {
        tagBtn.dataset.active = "true";
        if (tagBtn.dataset.tagtype === "ing") {
          ingTagsList.push(tagBtn.dataset.tag);
        } else if (tagBtn.dataset.tagtype === "app") {
          appTagsList.push(tagBtn.dataset.tag);
        } else if (tagBtn.dataset.tagtype === "ust") {
          ustTagsList.push(tagBtn.dataset.tag);
        }
      } else {
        tagBtn.dataset.active = "false";
        if (tagBtn.dataset.tagtype === "ing") {
          ingTagsList = ingTagsList.filter((tag) => {
            return tagBtn.dataset.tag != tag ? true : false;
          });
        } else if (tagBtn.dataset.tagtype === "app") {
          appTagsList = appTagsList.filter((tag) => {
            return tagBtn.dataset.tag != tag ? true : false;
          });
        } else if (tagBtn.dataset.tagtype === "ust") {
          ustTagsList = ustTagsList.filter((tag) => {
            return tagBtn.dataset.tag != tag ? true : false;
          });
        }
      }
      activatedTags = {
        ingTags: ingTagsList,
        appTags: appTagsList,
        ustTags: ustTagsList,
      };
      return { activatedTags };
      globalSearch();
    });
  });
};
