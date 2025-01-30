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
  posts[0].stories.forEach((chapter, index) => {
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

async function createChapters() {
  let fileName = allStories[0].title;
  let story;
  let frStory;
  console.log(fileName);
  await fetch(`./stories/${fileName}`)
    .then((res) => res.text())
    .then((text) => {
      story = text;
    })
    .catch((e) => console.error(e));
  console.log(story);
  // Regex-Expression to split at h1-lines:
  // <[\/]?div>|<h1 id="section(-\d?)">|<\/h1></h1>
  // also working
  // <h1 id="section(-?)(\d+)?">|<\/h1>
}
