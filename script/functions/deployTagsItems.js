export const deployTagsItems = () => {
  const labels = document.querySelectorAll("#tagsBar .tagSelector .label");
  labels.forEach(label => {
    label.addEventListener("click", () => {
      const tagSelector = label.closest(".tagSelector");
      const itemsList = tagSelector.children[1];
      if (!itemsList.classList.contains("active")) {
        itemsList.style.display = "block";
        itemsList.classList.remove("unactive");
        itemsList.classList.add("active");
        label.classList.remove("unactive");
        label.classList.add("active");
      } else {
        itemsList.classList.remove("active");
        itemsList.classList.add("unactive");
        label.classList.remove("active");
        label.classList.add("unactive");
        setTimeout(() => {
          itemsList.style.display = "none";
        }, 1000);
      }
    });
  });
};
