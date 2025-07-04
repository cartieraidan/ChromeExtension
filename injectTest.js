
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

            
            return true;
        }
        return false
    }

    function afterHandshake() {
       
        //###########################
        // And implement the two other buttons too

        // even more genious idea, why don't I just change the actual action path on the chatgpt website

        if (conected) {
            // here is to put everything want to do with webpage
            var data = { type: "FROM_PAGE", text: "Replacing form"};
            window.postMessage(data, "*");
            

            const observer = new MutationObserver(() => {
                if (observerBody()) {
                    // move all this into a function
                    const button = document.getElementById('composer-submit-button');
                    const form = button?.closest('form');

                    
                    
                    const input = form.querySelector('#prompt-textarea');
                    if (input) {
                        
                        var data = { type: "FROM_PAGE", text: "Found from query select" };
                        window.postMessage(data, "*");

                        var data = { type: "FROM_PAGE", text: input.textContent };
                        window.postMessage(data, "*");

                        input.focus();
                        
                        // this snippet fixed all my issues
                        const range = document.createRange();
                        range.selectNodeContents(input);
                        range.collapse(false);

                        const selection = window.getSelection();
                        selection.removeAllRanges();
                        selection.addRange(range);
                        // ends here
                        

                        
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
