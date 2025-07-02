(function () {
    
    let count = 0;
    const maxCount = 10000;
    
     window.addEventListener("message", function(event) {
        if (event.source !== window) return;

        if (event.data.type === "extension-ready") {
            var data = { type: "FROM_PAGE", text: "Connected"};
            window.postMessage(data, "*");
            clearInterval(interval);
        }
    });

    const interval = setInterval(() => {
        
        window.postMessage({ type: "page-ready"}, "*");
        
        count += 1000;
        if (count >= 10000) {
           // window.postMessage({ type: "extension-ready"}, "*");
            clearInterval(interval);
        }
    
    }, 1000); 
   

})();
