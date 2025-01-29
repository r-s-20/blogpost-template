// import { posts } from "./posts.js";
// import {script} from "../script.js";

window.addEventListener(
  "DOMContentLoaded",
  () => {
    loadTitles();
  },
  false
);

function loadTitles() {
  let content = document.getElementById("postContent");
  content.innerHTML = "";
  posts[0].chapters.forEach((chapter, index) => {
    content.innerHTML += `
        <a href="./storyPost.html" onclick="loadStoryPost(${index})" id="storyLink${index}">${chapter.title}</a>
        `;

    // console.log("adding event listener for", index);
    // document.getElementById(`storyLink${index}`).addEventListener("click", () => {
    //   console.log("Clicked post", index);
    //   loadStoryPost(index);
    // });
  });
}

function loadStoryPost(i) {
  setPostIndex(i);
}

function setPostIndex(i) {
  sessionStorage.setItem("currentPost", JSON.stringify(i));
}
