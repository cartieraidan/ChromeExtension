(function () {
    
    let count = 0;
    const maxCount = 10000;
    let conected = false;
    
    window.addEventListener("message", function(event) {
        if (event.source !== window) return;

        if (event.data.type === "extension-ready" && !conected) {
            var data = { type: "FROM_PAGE", text: "Connected"};
            window.postMessage(data, "*");

            conected = true;

            clearInterval(interval);
            afterHandshake();
        }
    });

    const interval = setInterval(() => {
        
        window.postMessage({ type: "page-ready"}, "*");
        
        count += 1000;
        if (count >= 10000) {
            var data = { type: "FROM_PAGE", text: "Unable to Connected"};
            window.postMessage(data, "*");
            clearInterval(interval);
        }
    
    }, 1000); 
    
    function observerBody() {
        const button = document.getElementById('composer-submit-button');
        const form = button?.closest('form');
        if (form && !form.dataset.customReplaced) {

            // add for simulate
            const activeEl = document.activeElement;
            const isInputFocused = form.contains(activeEl);
            let cursorPos = null;

            if (isInputFocused && 'selectionStart' in activeEl) {
                var data = { type: "FROM_PAGE", text: "Getting mouse focus"};
                window.postMessage(data, "*");
                cursorPos = { 
                    start: activeEl.selectionStart,
                    end: activeEl.selectionEnd,
                    tag: activeEl.tagName,
                    name: activeEl.getAttribute("name")
                };
            }
            //above is for simulate

            const replacement = form.cloneNode(true); 
            replacement.dataset.customReplaced = "true";
            replacement.id = "custom-replaced-form";

            const hiddenSubmit = document.createElement('button');
            hiddenSubmit.type = 'submit';
            hiddenSubmit.style.display = 'none';
            replacement.appendChild(hiddenSubmit);

            replacement.addEventListener('submit', (e) => {
                e.preventDefault();
                var data = { type: "FROM_PAGE", text: "Hijacked form handled"};
                window.postMessage(data, "*");
                // here where I can do API calls
                
                // look into what these do
                //const formData = new FormData(replacement);
                //const dataObj = Object.fromEntries(formData.entries());

                formSubmit();
            });

            replacement.addEventListener('keydown', function (e) {
                
                if (e.key === 'Enter' && e.shiftKey) {
                    var data = { type: "FROM_PAGE", text: "Enter + shift worked"};
                    window.postMessage(data, "*");

                    
                } else if (e.key === 'Enter') {
                    var data = { type: "FROM_PAGE", text: "Enter worked"};
                    window.postMessage(data, "*");

                    e.preventDefault(); // stop keys from entering -> works
                    formSubmit();
                }
                    

            });

            form.parentNode.replaceChild(replacement, form);

            if (cursorPos) {
                var data = { type: "FROM_PAGE", text: "Restoring mouse focus"};
                window.postMessage(data, "*");
                const restoredInput = replacement.querySelector(
                    `${cursorPos.tag.toLowerCase()}[name="${cursorPos.name}"]`
                );

                if (restoredInput) {
                    restoredInput.focus();
                    restoredInput.setSelectionRange(cursorPos.start, cursorPos.end);
                }
            }
            return true;
        }
        return false
    }

    function afterHandshake() {
        // going to use this script instead of v2 and whenever form gets replaced need to simulate click inside form
        //****************************************************** */
        // and add the observer part in a function and return true or false to use in if statments
        //###########################
        // And implement the two other buttons too

        if (conected) {
            // here is to put everything want to do with webpage
            var data = { type: "FROM_PAGE", text: "Replacing form"};
            window.postMessage(data, "*");
            
            //const button = document.getElementById("composer-submit-button");
            //const form = button.closest("form");

            // maybe add another one to replace the form right off the bat instead of using a observer
            const observer = new MutationObserver(() => {
                if (observerBody()) {
                    const elemendF = document.getElementById('composer-submit-button');
                    if (elemendF) {
                        var data = { type: "FROM_PAGE", text: "Able to find element by id!!!!"};
                        window.postMessage(data, "*");
                        let count = 0;
                        const clickInterval = setInterval(() => {
                        
                            count += 1000;
                            elemendF.click();
                            if (count >= 10000) {
                                var data = { type: "FROM_PAGE", text: "Trying to click"};
                                window.postMessage(data, "*");
                                clearInterval(clickInterval);
                            }
                            
                        }, 1000);
                        
                    }
                }
            });

            observer.observe(document.body, { childList: true, subtree: true });
        }


    }

    function formSubmit() {
        // function for after you submit the hijacked one
        var data = { type: "FROM_PAGE", text: "Form submit activated"};
        window.postMessage(data, "*");
    }
    
})();
