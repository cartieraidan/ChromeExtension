chrome.runtime.sendMessage({ type: "log", message: "content.js is running" });

// Injecting script to stop form submission
window.addEventListener("message", function(event) {
  //if (event.source !== window || !event.data || event.data.source !== 'preventForm') return;
  
  if (event.source != window)
    return;

  if (event.data.type === "page-ready") {
    chrome.runtime.sendMessage({ type: "log", message: "Handshake complete: script is ready" });
    window.postMessage({ type: "extension-ready"}, "*");
  }

  if (event.data.type && (event.data.type == "FROM_PAGE")) {
    chrome.runtime.sendMessage({ type: "log", message: event.data.text });
  }
  //chrome.runtime.sendMessage({ type: event.data.type, message: event.data.message });

});

const script = document.createElement('script');
script.src = chrome.runtime.getURL('injectTest.js');
script.onload = function () {
  this.remove();
};
(document.head || document.documentElement).appendChild(script); // loads script into browser


//const button = document.getElementById("composer-submit-button");
//const form = button.closest("form");
// for replacing button
/*
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
    //send a http request from here
    //also need to another function for stoping submit forms with the enter key
  })
  
  button.parentNode.insertBefore(newButton, button.nextSibling);
  button.style.display = "none";
  chrome.runtime.sendMessage({ type: "log", message: "Button Replaced"});
}
*/
