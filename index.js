document.getElementById("myButton").addEventListener("click", () => {
    
    chrome.runtime.sendMessage({ type: "log", message: "button has been pressed" });


    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            files: ["content.js"]
        });
    });
});
