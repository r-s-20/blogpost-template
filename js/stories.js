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
  let fileName = allStories[1].title;
  let story;
  let chapters = [];
  await fetch(`./stories/${fileName}`)
    .then((res) => res.text())
    .then((text) => {
      story = text;
    })
    .catch((e) => console.error(e));
  let noSpaces = cleanupSpaces(story);
  chapters = splitText(noSpaces);
  console.log(chapters);
}

function cleanupSpaces(story) {
  let noSpaces = story.replace(/\s+/g, " ");
  noSpaces = noSpaces
    .replaceAll(/<(\/)?div>/g, "")
    .replaceAll(/\s+<p>\s+/g, "<p>")
    .replaceAll(/\s+<\/p>\s+/g, "</p>");
  return noSpaces;
}

function splitText(noSpaces) {
  let chapters = [];
  let splitted = noSpaces.split(/<\/?h1>?/);
  for (let index = 0; index < splitted.length; index++) {
    const element = splitted[index];
    if (index % 2 == 0 && index > 0) {
      chapters.push(element.trim());
    }
  }
  return chapters;
}
