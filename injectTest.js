(function () {

    function injectButton() {
        const button = document.createElement('button');

        button.textContent = "CLICK";
        button.id = "InjectedButton";
        button.classList.add("my-custom-button");

        //35, 141, 36, 1 color for when button pressed or hovered

        Object.assign(button.style, {
            width: '80px',
            height: '80px',
            background: 'rgba(96, 217, 98, 1)',
            color: 'white',
            fontSize: '20px',
            cursor: 'pointer',
            zIndex: 2147483647,
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            border: 'none',
            borderRadius: '40px',
            boxShadow: '0 0 25px 3px rgba(24, 94, 32, 0.6)', 
            transition: 'box-shadow 0.1s ease, transform 0.15s ease, background 0.2s ease'
        });

        //hover, make it darker
        button.addEventListener('mouseenter', () => {
            Object.assign(button.style, {
                transform: 'scale(1.06)',
                background: 'rgba(35, 141, 36, 1)'
            });
        });

        //hover end
        button.addEventListener('mouseleave', () => {
            Object.assign(button.style, {
                transform: 'scale(1)',
                background: 'rgba(96, 217, 98, 1)'
            });
        });

        //button pressed
        button.addEventListener('mousedown', () => {
            Object.assign(button.style, {
                transform: 'scale(0.8)',
                background: 'rgba(35, 141, 36, 1)',
                boxShadow: '0 0 25px 8px rgba(27, 173, 44, 0.6)'
            });
        });

        //button release
        //call script from here
        button.addEventListener('mouseup', () => {
            Object.assign(button.style, {
                transform: 'scale(1.06)',
                background: 'rgba(35, 141, 36, 1)',
                boxShadow: '0 0 25px 3px rgba(24, 94, 32, 0.6)'
            });
        });

        document.body.appendChild(button);


    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectButton);
    } else {
        injectButton();
    }
    


})();
