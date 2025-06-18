chrome.runtime.sendMessage({ type: "log", message: "content.js is running" });

const myDiv = document.getElementById("prompt-textarea");

if (myDiv) {
  //console.log("Div found:", myDiv);
  chrome.runtime.sendMessage({ type: "log", message: "Div found: " + myDiv });
  chrome.runtime.sendMessage({ type: "log", message: "Div text content: " + myDiv.textContent });
} else {
  //console.log("Div not found");
  chrome.runtime.sendMessage({ type: "log", message: "Div not found" });
}

const button = document.getElementById("composer-submit-button");
const form = button.closest("form");

if (form) {
    chrome.runtime.sendMessage({ type: "log", message: "Found form: " + form.className });
} else {
    chrome.runtime.sendMessage({ type: "log", message: "No form found" });
}

//maybe try replacing button

// because webpage uses react it is almost impossible to interrupt form submission, so it will probably need to do live correction so on the fly correction
// and maybe research if theres a way to interrupt react form submission


chrome.runtime.sendMessage({ type: "log", message: "content.js is done running" });