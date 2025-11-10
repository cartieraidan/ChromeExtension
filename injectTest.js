(function () {

    function injectButton() {
        const button = document.createElement('button');

        button.textContent = "CLICK";
        button.id = "InjectedButton";
        button.classList.add("my-custom-button");

        Object.assign(button.style, {
            width: '100px',
            height: '100px',
            background: 'rgba(35, 141, 36, 1)',
            color: 'white',
            fontSize: '20px',
            cursor: 'pointer',
            zIndex: 2147483647,
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            border: 'none',
            borderRadius: '50px',
            boxShadow: '0 0 15px 3px rgba(24, 94, 32, 0.6)', 
            transition: 'box-shadow 0.3s ease'
        });

        document.body.appendChild(button);


    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectButton);
    } else {
        injectButton();
    }
    


})();
