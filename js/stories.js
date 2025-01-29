import { posts } from "../js/posts.js";
let currentPost = 0;

window.addEventListener(
  "DOMContentLoaded",
  () => {
    loadPost(currentPost);
  },
  false
);

function loadPost(i) {
  let title = document.getElementById("postTitle");
  let content = document.getElementById("postContent");
  console.log(title, content);
  if (posts[0].chapters[i]) {
    title.innerHTML = posts[0].chapters[i].title;
    content.innerHTML = posts[0].chapters[i].content;
  }
  adjustButtonStatus();
}

document.getElementById("nextPost").addEventListener("click", () => {
  showNextPost();
});

document.getElementById("previousPost").addEventListener("click", () => {
  showPreviousPost();
});

function showNextPost() {
  currentPost = currentPost < posts[0].chapters.length - 1 ? (currentPost += 1) : 0;
  loadPost(currentPost);
  adjustButtonStatus();
}

function showPreviousPost() {
  currentPost = currentPost >= 1 ? (currentPost = 0) : (currentPost = posts[0].chapters.length - 1);
  loadPost(currentPost);
  adjustButtonStatus();
}

function adjustButtonStatus() {
  let btnNext = document.getElementById("nextPost");
  let btnPrev = document.getElementById("previousPost");

  if (currentPost == 0) {
    btnPrev.setAttribute("disabled", "true");
  } else btnPrev.removeAttribute("disabled");

  if (currentPost == posts[0].chapters.length - 1) {
    btnNext.setAttribute("disabled", "true");
  } else btnNext.removeAttribute("disabled");
}

// document.getElementById("nextPost").addEventListener("click", () => {
//     showNextPost();
//   });

//   document.getElementById("previousPost").addEventListener("click", () => {
//     showPreviousPost();
//   });

//   function showNextPost() {
//     currentPost = currentPost < posts.chapters.length - 1 ? (currentPost += 1) : 0;
//     loadPost(currentPost);
//     adjustButtonStatus();
//   }

//   function showPreviousPost() {
//     currentPost = currentPost >= 1 ? (currentPost = 0) : (currentPost = posts.chapters.length - 1);
//     loadPost(currentPost);
//     adjustButtonStatus();
//   }

//   function adjustButtonStatus() {
//     let btnNext = document.getElementById("nextPost");
//     let btnPrev = document.getElementById("previousPost");

//     if (currentPost == 0) {
//       btnPrev.setAttribute("disabled", "true");
//     } else btnPrev.removeAttribute("disabled");

//     if (currentPost == posts.chapters.length - 1) {
//       btnNext.setAttribute("disabled", "true");
//     } else btnNext.removeAttribute("disabled");
//   }
