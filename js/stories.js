window.addEventListener(
  "load",
  () => {
    initStories();
  },
  false
);

async function initStories() {
  setTimeout(renderTitles, 500)
}

function renderTitles() {
  renderSinglePostTitles();
  renderStoryTitles();
}

function renderSinglePostTitles() {
  let container = document.getElementById("postTitles");
  container.innerHTML = "";
  posts[0].stories[0].chapters.forEach((chapter, index) => {
    container.innerHTML += `
        <a href="./storyPost.html" onclick="loadStoryPost(${index})" id="storyLink${index}">${chapter.title}</a>
        `;
  });
}

function renderStoryTitles() {
  console.log("rendering titles");
  
  let container = document.getElementById("storyTitles");
  container.innerHTML = "";
  console.log(posts[0].stories);
  posts[0].stories.forEach((story, index) => {
    container.innerHTML += `
        <!-- <a href="./storyPost.html" onclick="loadStory(${index})" id="storyLink${index}">${story.title}</a> -->
        <a href="./storyPost.html" id="storyLink${index}">${story.title}</a>
        `;
  });
}

function loadStoryPost(i) {
  setPostIndex(i);
}

function setPostIndex(i) {
  sessionStorage.setItem("currentPost", JSON.stringify(i));
}


