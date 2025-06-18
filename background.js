console.log("Extension script loaded lol");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "log") {
    console.log("Background received:", request.message);
  }
});