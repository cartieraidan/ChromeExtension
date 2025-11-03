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
    
    function afterHandshake() {

        if (!conected) return;

        var data = { type: "FROM_PAGE", text: "V2 running"};
        window.postMessage(data, "*");

        // code here
        // add an observer that then attaches a event listener to form
        const observer = new MutationObserver(() => {
            const button = document.getElementById('composer-submit-button');
            const form = button?.closest('form');

            if (form) {
                form.addEventListener('submit', (event) =>{
                    event.preventDefault();
                    var data = { type: "FROM_PAGE", text: "Submitted Stopped"};
                    window.postMessage(data, "*");
                });
            }
        });
        
        observer.observe(document.body, { childList: true, subtree: true });

    } // afterHandshake function

    function formSubmit() {
        // function for after you submit the hijacked one
        var data = { type: "FROM_PAGE", text: "Form submit activated"};
        window.postMessage(data, "*");
    }
    
})();
