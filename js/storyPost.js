let currentPost = 0;
getCurrentPost();

window.addEventListener(
  "DOMContentLoaded",
  () => {
    loadPost(currentPost);
  },
  false
);

function getCurrentPost() {
  let storedPost = JSON.parse(sessionStorage.getItem("currentPost"));
  if (storedPost) {
    currentPost = storedPost;
  }
}

function loadPost(i) {
  let title = document.getElementById("postTitle");
  let content = document.getElementById("postContent");
  let chapter = posts[0].chapters[i];
  if (chapter) {
    title.innerHTML = chapter.title;
    content.innerHTML = chapter.content;
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
  sessionStorage.setItem("currentPost", JSON.stringify(currentPost));
  adjustButtonStatus();
}

function showPreviousPost() {
  currentPost = currentPost >= 1 ? (currentPost = 0) : (currentPost = posts[0].chapters.length - 1);
  loadPost(currentPost);
  sessionStorage.setItem("currentPost", JSON.stringify(currentPost));
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
