import { posts } from "./posts.js";

let currentPost = 0;

window.addEventListener(
  "DOMContentLoaded",
  () => {
    init();
  },
  false
);

async function init() {
  await includeHTML();
  loadPost(currentPost);
  adjustButtonStatus();
}

async function includeHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    let file = element.getAttribute("w3-include-html"); // "includes/header.html"
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = "Page not found";
    }
  }
}

function loadPost(i) {
  let title = document.getElementById("postTitle");
  let content = document.getElementById("postContent");
  if (posts[i]) {
    title.innerHTML = posts[i].title;
    content.innerHTML = posts[i].content;
  }
}

document.getElementById("nextPost").addEventListener("click", () => {
  showNextPost();
});

document.getElementById("previousPost").addEventListener("click", () => {
  showPreviousPost();
});

function showNextPost() {
  currentPost = currentPost < posts.length - 1 ? (currentPost += 1) : 0;
  loadPost(currentPost);
  adjustButtonStatus();
}

function showPreviousPost() {
  currentPost = currentPost >= 1 ? (currentPost = 0) : (currentPost = posts.length - 1);
  loadPost(currentPost);
  adjustButtonStatus();
}

function adjustButtonStatus() {
  let btnNext = document.getElementById("nextPost");
  let btnPrev = document.getElementById("previousPost");

  if ((currentPost == 0)) {
    btnPrev.setAttribute("disabled", "true");
  } else btnPrev.removeAttribute("disabled");

  if ((currentPost == posts.length - 1)) {
    btnNext.setAttribute("disabled", "true");
  } else btnNext.removeAttribute("disabled");
}
