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
//const style = document.getElementById("composer-submit-button").style.cssText;


if (button) {
  chrome.runtime.sendMessage({ type: "log", message: "Removing button"});

  const computedStyle = window.getComputedStyle(button);

  const newButton = document.createElement("button");
  for (let prop of computedStyle) {
    newButton.style[prop] = computedStyle.getPropertyValue(prop);
  }

  
  newButton.innerHTML = button.innerHTML;

  newButton.id = "my-submit-button";
  newButton.type = "button";
  

  //function for button here
  newButton.addEventListener("click", () => {
    window.open("https://google.com", "_blank");
    //Get it to execute a pyton file with the div text contents as argument
  })
  
  button.parentNode.insertBefore(newButton, button.nextSibling);
  button.style.display = "none";
  chrome.runtime.sendMessage({ type: "log", message: "Button Replaced"});
}

if (form) {
    chrome.runtime.sendMessage({ type: "log", message: "Found form: " + form.className });
} else {
    chrome.runtime.sendMessage({ type: "log", message: "No form found" });
}

//maybe try replacing button

// because webpage uses react it is almost impossible to interrupt form submission, so it will probably need to do live correction so on the fly correction
// and maybe research if theres a way to interrupt react form submission


chrome.runtime.sendMessage({ type: "log", message: "content.js is done running" });
