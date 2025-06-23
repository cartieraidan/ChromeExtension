// code from content.js for intercepting button press and enter key however it was a form so useless
// For intercept button click + enter key
const observer = new MutationObserver(() => {
    const button = document.getElementById("composer-submit-button")


    if (button) {
        chrome.runtime.sendMessage({ type: "log", message: "Found button: " + button });
    } else {
        chrome.runtime.sendMessage({ type: "log", message: "Did not locate button" });
    }

    // button click
    if (button) {
        chrome.runtime.sendMessage({ type: "log", message: "Made it to location 1" });

        button.addEventListener("click", (e) => {
            e.preventDefault();
            chrome.runtime.sendMessage({ type: "log", message: "Button has been intercepted" });
        });

        
        // Enter key

        document.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                chrome.runtime.sendMessage({ type: "log", message: "Enter key has been stopped" });
            }
        }, true);

        observer.disconnect()
    }
});

observer.observe(document.body, { childList: true, subtree: true });
