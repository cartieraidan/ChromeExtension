
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

            const buttons = replacement.getElementsByTagName('button');
            for (const btn of buttons) {
                const label = btn.ariaLabel;

                if (label === 'Upload files and more') {
                    btn.addEventListener('click', (e) => {
                        e.preventDefault();
                        var data = { type: "FROM_PAGE", text: "Upload files button pressed"};
                        window.postMessage(data, "*");
                    });
                } else if (label === 'Search') {
                    btn.addEventListener('click', (e) => {
                        e.preventDefault();

                        const wrapper = btn.closest('div');
                        const isPressed = btn.getAttribute('aria-pressed') === 'true';
                        btn.setAttribute('aria-pressed', String(!isPressed));

                        //wrapper.classList.toggle('radix-state-open:bg-black/10', !isPressed); // toggle the div that wraps it that dynamically changes its style
                        if (wrapper) {
                            if (!isPressed) {
                            // Going to "pressed" state
                            wrapper.classList.remove(
                                'border-token-border-default',
                                'text-token-text-secondary'
                            );
                            wrapper.classList.add(
                                'border-transparent',
                                'bg-token-composer-blue-bg',
                                'text-token-interactive-label-accent-default'
                            );
                            } else {
                            // Going back to "not pressed"
                            wrapper.classList.remove(
                                'border-transparent',
                                'bg-token-composer-blue-bg',
                                'text-token-interactive-label-accent-default'
                            );
                            wrapper.classList.add(
                                'border-token-border-default',
                                'text-token-text-secondary'
                            );
                            }
                        }


                        var data = { type: "FROM_PAGE", text: "Search button pressed"};
                        window.postMessage(data, "*");
                    });

                } else if (label === 'Send prompt') {
                    btn.addEventListener('click', (e) => {
                        e.preventDefault();
                        var data = { type: "FROM_PAGE", text: "Send prompt button pressed"};
                        window.postMessage(data, "*");
                    });
                }
            }

           

            replacement.addEventListener('submit', (e) => {
                e.preventDefault();
                var data = { type: "FROM_PAGE", text: "Hijacked form handled"};
                window.postMessage(data, "*");
                // here where I can do API calls
                
                // look into what these do
                //const formData = new FormData(replacement);
                //const dataObj = Object.fromEntries(formData.entries());

                formSubmit(replacement);
            });

            replacement.addEventListener('keydown', function (e) {
                
                if (e.key === 'Enter' && e.shiftKey) {
                    var data = { type: "FROM_PAGE", text: "Enter + shift worked"};
                    window.postMessage(data, "*");

                    
                } else if (e.key === 'Enter') {
                    var data = { type: "FROM_PAGE", text: "Enter worked"};
                    window.postMessage(data, "*");

                    e.preventDefault(); // stop keys from entering -> works
                    formSubmit(replacement); 
                }
                    

            });

            form.parentNode.replaceChild(replacement, form);

            
            return true;
        }
        return false
    }

    function cursorFocus() {
        const button = document.getElementById('composer-submit-button');
        const form = button?.closest('form');
        
        const input = form.querySelector('#prompt-textarea');
        if (input) {

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

    function afterHandshake() {
       
        //###########################
        // And implement the two other buttons too maybe the other button too

        // even more genious idea, why don't I just change the actual action path on the chatgpt website

        if (conected) {
            // here is to put everything want to do with webpage
            var data = { type: "FROM_PAGE", text: "Replacing form"};
            window.postMessage(data, "*");
            

            const observer = new MutationObserver(() => {
                if (observerBody()) {
                    cursorFocus();
                    // work on the button that says search now
                    // simple like copy styles and stuff then let it just be variable for when letting it go back to its normal state -> boolean true or false
                }
            });

            observer.observe(document.body, { childList: true, subtree: true });
        }


    }

    function formSubmit(form) {
        // function for after you submit the hijacked one
        // need to add an argument where the replacement form is passed in so can do replacement.submit() after all backend logic preformed
        var data = { type: "FROM_PAGE", text: "Form submit activated"};
        window.postMessage(data, "*");
        form.submit();
    }
    
})();
