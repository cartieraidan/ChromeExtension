(function () {
    
    let count = 0;
    const maxCount = 10000;
    let conected = false;
    
    window.addEventListener("message", function(event) {
        if (event.source !== window) return;

        if (event.data.type === "extension-ready") {
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
    
    function afterHandshake() {

        if (conected) {
            // here is to put everything want to do with webpage
            var data = { type: "FROM_PAGE", text: "Replacing form"};
            window.postMessage(data, "*");
            
            //const button = document.getElementById("composer-submit-button");
            //const form = button.closest("form");

            const observer = new MutationObserver(() => {
                const button = document.getElementById('composer-submit-button');
                const form = button?.closest('form');
                if (form && !form.dataset.customReplaced) {
                    const replacement = form.cloneNode(true); // basic shell
                    replacement.dataset.customReplaced = "true";
                    /*
                    replacement.innerHTML = `
                    <textarea placeholder="Hijacked form"></textarea>
                    <button type="submit">Custom Submit</button>
                    `;
                    */
                    replacement.addEventListener('submit', (e) => {
                        e.preventDefault();
                        var data = { type: "FROM_PAGE", text: "Hijacked form handled"};
                        window.postMessage(data, "*");
                        // here where I can do API calls
                    });
                    form.parentNode.replaceChild(replacement, form);
                }
            });

            observer.observe(document.body, { childList: true, subtree: true });
        }


    }
    
})();
