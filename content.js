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

{
  const scriptInject = document.createElement('script');
  scriptInject.src = chrome.runtime.getURL('injectTest.js');
  scriptInject.onload = function () {
    this.remove();
  };
  (document.head || document.documentElement).appendChild(scriptInject); // loads script into browser

}
