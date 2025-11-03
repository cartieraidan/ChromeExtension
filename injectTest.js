(function () {

    function injectButton() {
        const button = document.createElement('button');

        button.textContent = "CLICK";
        button.id = "InjectedButton";
        button.classList.add("my-custom-button");

        Object.assign(button.style, {
            width: '200px',
            height: '50px',
            background: 'teal',
            color: 'white',
            fontSize: '20px',
            cursor: 'pointer',
            zIndex: 2147483647
        });

        const container = document.getElementById('thread-bottom-container');

        //if (container) {
           // container.appendChild(button);
       //} else {
        //    document.body.appendChild(button);
       // }

        document.body.appendChild(button);


    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectButton);
    } else {
        injectButton();
    }
    


})();
