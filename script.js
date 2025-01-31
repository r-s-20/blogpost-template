// import { posts } from "./js/posts.js";
// import { stories } from "./js/stories.js";

window.addEventListener(
  "DOMContentLoaded",
  () => {
    init();
    restoreColors();
    checkCookie();
  },
  false
);

async function init() {
  await includeHTML();
  await storiesFromHTML();
  document.getElementById("sliderBase").addEventListener("input", () => {
    let slider = document.getElementById("sliderBase");
    changeBaseColor("--base-color", slider.value);
  });

  document.getElementById("sliderHighlight").addEventListener("input", () => {
    let slider = document.getElementById("sliderHighlight");
    changeBaseColor("--base-color2", slider.value);
  });
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

function changeBaseColor(color, hue) {
  let r = document.querySelector(":root");
  r.style.setProperty(color, hue);
  sessionStorage.setItem(color, JSON.stringify(hue));
}

function restoreColors() {
  let color1 = sessionStorage.getItem("--base-color");
  let color2 = sessionStorage.getItem("--base-color2");
  if (color1) {
    changeBaseColor("--base-color", JSON.parse(color1));
  }
  if (color2) {
    changeBaseColor("--base-color2", JSON.parse(color2));
  }
}

function confirmCookie() {
  document.getElementById("cookiesInfo").close();
  sessionStorage.setItem("confirmedCookie", true);
}

function checkCookie() {
  if (sessionStorage.getItem("confirmedCookie")) {
    document.getElementById("cookiesInfo").removeAttribute("open");
  }
}

async function storiesFromHTML() {
  let stories = [];
  console.log("old posts", posts[0].stories);
  for (let i = 0; i < allStories.length; i++) {
    const story = allStories[i];
    let file = `./stories/${story.title}`;
    await processFile(story, stories, file);
  }
  stories.forEach((story) => {
    posts[0].stories.push(story);
  });
  console.log("new posts is", posts[0].stories);
}

/**
 *
 * @param {{title:String, content: String}} story
 * @param {[story]} stories
 * @param {String} file
 */
async function processFile(story, stories, file) {
  let text = await getText(file);
  let chapters = [];
  if (text) {
    let cleanTitle = story.title.replace(".html", "");
    stories.push({ title: cleanTitle, chapters: [] });
    let noSpaces = cleanupSpaces(text);
    chapters = splitToChapters(noSpaces);
    stories[stories.length - 1].chapters = chapters;
  }
}

/**
 * Fetches content from a filepath and returns it as text
 * @param {String} file
 * @returns {String}
 */
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
      chapters.push({ "title": title });
    } else if (index % 2 == 0 && index > 0) {
      chapters[chapters.length - 1]["content"] = element.trim();
    }
  }
  return chapters;
}
