storiesFromHTML();

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
  });
}

function loadStoryPost(i) {
  setPostIndex(i);
}

function setPostIndex(i) {
  sessionStorage.setItem("currentPost", JSON.stringify(i));
}

async function storiesFromHTML() {
  let stories = [];
  for (let i = 0; i < allStories.length; i++) {
    const story = allStories[i];
    let file = `./stories/${story.title}`;
    let chapters = [];
    let text = await getText(file);
    if (text) {
      let cleanTitle = story.title.replace(".html", "")
      stories.push({ title: cleanTitle, chapters: [] });
      let noSpaces = cleanupSpaces(text);
      chapters = splitToChapters(noSpaces);
      stories[stories.length - 1].chapters.push(chapters);
    }
  }
  console.log("stories is now", stories);
}

async function getText(file) {
  let resp = await fetch(file);
  if (resp.ok) {
    return await resp.text();
  } else {
    console.error("File not found, please check storyList.js");
  }
}

function cleanupSpaces(story) {
  let noSpaces = story.replace(/\s+/g, " ");
  noSpaces = noSpaces
    .replaceAll(/<(\/)?div>/g, "")
    .replaceAll(/\s+<p>\s+/g, "<p>")
    .replaceAll(/\s+<\/p>\s+/g, "</p>");
  return noSpaces;
}

/**
 * Splits html-Text into array of chapters based on h1-tags. 
 * h1 will be used as title, text after h1 as content.
 * @param {String} noSpaces 
 * @returns {[{title: String, content: String}]}
 */
function splitToChapters(noSpaces) {
  let chapters = [];
  let splitted = noSpaces.split(/<\/?h1>?/);
  for (let index = 0; index < splitted.length; index++) {
    const element = splitted[index];
    if (index % 2 != 0) {
      let title = element.trim().replace(/id="section[-]?[\d+]?">/, "");
      chapters.push({"title": title});
    } else if (index % 2 == 0 && index > 0) {
      chapters[chapters.length-1]["content"] = element.trim();
    }
  }
  return chapters;
}
