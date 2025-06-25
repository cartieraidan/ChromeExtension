(function () {
   
    window.postMessage({ source: 'preventForm', type: 'log', message: 'function Working' }, '*');

    document.addEventListener('submit', function (e) {
        e.preventDefault();
        //chrome.runtime.sendMessage({ type: "log", message: "Form submission prevented" });
        window.postMessage({ source: 'preventForm', type: 'log', message: 'Form submission prevented' }, '*');
    }, true);

    document.addEventListener('click', function (e) {
        const btn = e.target.closest('button[type="submit"], input[type="submit"]');
        if (btn) {
            e.preventDefault();
            e.stopPropagation();
            window.postMessage({ source: 'preventForm', type: 'log', message: 'Submit button click prevented' }, '*');
        }
        
    }, true);

    const originalSubmit = HTMLFormElement.prototype.submit;

    HTMLFormElement.prototype.submit = function () {
        //chrome.runtime.sendMessage({ type: "log", message: "Blocked?" });
        window.postMessage({ source: 'preventForm', type: 'log', message: 'blocked form.submit()' }, '*');
        // uncomment to submit form 
        //return originalSubmit.apply(this, arguments);
    };

    const originalRequestSubmit = HTMLFormElement.prototype.requestSubmit;

    HTMLFormElement.prototype.requestSubmit = function () {
        window.postMessage({ source: 'preventForm', type: 'log', message: 'blocked form.requestsubmit()' }, '*');
        //return originalRequestSubmit.apply(this, arguments);
    }
})();
