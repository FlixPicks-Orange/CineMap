const elements = new Set();
const template = document.getElementById("li_template");
// Insert YouTube Button
const element1 = template.content.firstElementChild.cloneNode(true);
element1.querySelector(".title").textContent = "Open Youtube";
element1.querySelector(".pathname").textContent = "https://www.youtube.com";
element1.querySelector("a").addEventListener("click", async () => {
    chrome.tabs.create({url: "https://www.youtube.com/watch?v=GDzBE6vz5r0"});
});
elements.add(element1);
// Insert Netflix Button
const element2 = template.content.firstElementChild.cloneNode(true);
element2.querySelector(".title").textContent = "Netflix - Big Mouth";
element2.querySelector(".pathname").textContent = "https://www.netflix.com/watch/";
element2.querySelector("a").addEventListener("click", async () => {
    chrome.tabs.create({url: "https://www.netflix.com/watch/81250624"});
});
elements.add(element2);
// Append Buttons to Menu
document.querySelector('ul').append(...elements);


// Event Listener For Toggle Button
document.addEventListener('DOMContentLoaded', function() {
  const Cinemap = document.getElementById('Cinemap');
  Cinemap.addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { toggleOverlay: true });
      window.close();
    });
  });
});