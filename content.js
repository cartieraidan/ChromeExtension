chrome.runtime.sendMessage({ type: "log", message: "content.js is running" });


{
  const scriptInject = document.createElement('script');
  scriptInject.src = chrome.runtime.getURL('injectTest.js');
  scriptInject.onload = function () {
    this.remove();
  };
  (document.head || document.documentElement).appendChild(scriptInject); // loads script into browser

}
