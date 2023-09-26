export const tagsDisplayer = (bool, tagBtn) => {
  const tagsContainer = document.querySelector("#tagsContainer");
  const tagsSelector = document.querySelectorAll(".tag");
  const data = tagBtn.dataset.tag;
  const datatype = tagBtn.dataset.tagType;

  if (bool) {
    const button = document.createElement("button");
    button.innerHTML = `${data}<i class="fa-solid fa-xmark"></i>`;
    button.setAttribute("class", "untag");
    button.classList.add(data.split(/\s+/).join());
    button.setAttribute("data-tag", data);
    button.setAttribute("data-tagtype", datatype);
    tagsContainer.appendChild(button);
  } else {
    const btnbtn = document.getElementsByClassName(
      `${data.split(/\s+/).join()}`
    );
    btnbtn[0].remove();
  }

  const untag = document.querySelectorAll(".untag");

  untag.forEach((element) => {
    element.addEventListener("click", () => {
      const tagList = document.querySelector(
        `.items button[data-tag = "${element.dataset.tag}"]`
      );
      tagList.dataset.active = "false";
      element.remove();
    });
  });
};
