document.getElementById("myButton").addEventListener("click", () => {
    
    chrome.runtime.sendMessage({ type: "log", message: "button has been pressed" });

});
