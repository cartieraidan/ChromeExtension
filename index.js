document.getElementById("myButton").addEventListener("click", () => {
    
    chrome.runtime.sendMessage({ type: "log", message: "button has been pressed" });

    chrome.runtime.sendNativeMessage(
        "com.example.script",
        { text: "Hello Python" },
        (response) => {
            chrome.runtime.sendMessage({ type: "log", message: "Python said: ", response });
        }
    );

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            files: ["content.js"]
        });
    });
});
