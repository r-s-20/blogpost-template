let currentChapter = 0;
let currentStory = 0;
getcurrentPost();

window.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("current Post is", posts);
    console.log("i and j in loadPost are", currentStory, currentChapter);
    setTimeout(() => loadPost(currentStory, currentChapter), 500);
  },
  false
);

function getcurrentPost() {
  let storedStory = JSON.parse(sessionStorage.getItem("currentStory"));
  let storedChapter = JSON.parse(sessionStorage.getItem("currentChapter"));
  if (storedStory) {
    currentStory = storedStory;
  }
  if (storedChapter) {
    currentChapter = storedChapter;
  }
}

function loadPost(i, j) {
  console.log("i and j in loadPost are", i, j);
  let title = document.getElementById("postTitle");
  let content = document.getElementById("postContent");
  let chapter = posts[0].stories[i].chapters[j];
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
  currentChapter = currentChapter < posts[0].stories[currentStory].chapters.length - 1 ? (currentChapter += 1) : 0;
  loadPost(currentStory, currentChapter);
  sessionStorage.setItem("currentChapter", JSON.stringify(currentChapter));
  adjustButtonStatus();
  window.scrollTo(0,0);
}

function showPreviousPost() {
  currentChapter =
    currentChapter >= 1 ? (currentChapter = 0) : (currentChapter = posts[0].stories[currentStory].chapters.length - 1);
  loadPost(currentStory, currentChapter);
  sessionStorage.setItem("currentChapter", JSON.stringify(currentChapter));
  adjustButtonStatus();
  window.scrollTo(0,0);
}

function adjustButtonStatus() {
  let btnNext = document.getElementById("nextPost");
  let btnPrev = document.getElementById("previousPost");

  if (currentChapter == 0) {
    btnPrev.setAttribute("disabled", "true");
  } else btnPrev.removeAttribute("disabled");

  if (currentChapter == posts[0].stories[currentStory].chapters.length - 1) {
    btnNext.setAttribute("disabled", "true");
  } else btnNext.removeAttribute("disabled");
}
