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
    document.getElementById('cookiesInfo').removeAttribute('open');
  }
}
