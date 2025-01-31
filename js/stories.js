window.addEventListener(
  "load",
  () => {
    initStories();
  },
  false
);

async function initStories() {
  setTimeout(renderTitles, 700);
}

function renderTitles() {
  renderSinglePostTitles();
  renderStoryTitles();
}

function renderSinglePostTitles() {
  let container = document.getElementById("postTitles");
  container.innerHTML = "";
  posts[0].stories.forEach((story, i) => {
    container.innerHTML += `
      <h3>${story.title}</h3>
    `;
    story.chapters.forEach((chapter, j) => {
      container.innerHTML += `
        <a href="./storyPost.html" onclick="loadStoryPost(${i}, ${j})" id="storyLink${i}-${j}">${chapter.title}</a>
        `;
    });
  });
}

function renderStoryTitles() {
  console.log("rendering titles");

  let container = document.getElementById("storyTitles");
  container.innerHTML = "";
  posts[0].stories.forEach((story, i) => {
    container.innerHTML += `
        <a href="./storyPost.html" onclick="loadStoryPost(${i}, 0)" id="storyLink${i}">${story.title}</a>
        `;
  });
}

function loadStoryPost(i, j) {
  sessionStorage.setItem("currentStory", JSON.stringify(i));
  sessionStorage.setItem("currentChapter", JSON.stringify(j));
}
