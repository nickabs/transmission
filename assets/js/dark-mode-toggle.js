/*
 * toggle between dark and light mode
 * if the user has set a system preference then default to that setting
 * if they specify a setting save it in local storage so it is remembered next time
 * 
*/

(function() {
    const darkModeButton = document.querySelector("button.dark-mode");
    const lightModeButton = document.querySelector("button.light-mode");

    if (! darkModeButton || ! lightModeButton) {
        return;
    }

    var storedDataColorTheme = localStorage.getItem('data-color-scheme') || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

    if (storedDataColorTheme) {
        document.documentElement.setAttribute('data-color-scheme', storedDataColorTheme);
    }

    /* 
     * where an svg icon is loaded externally, e.g in the sidebar, 
     * we have to update the svg paths to reflect the selected color scheme 
     */
    function updateIconColor() {
        if (!icons) return;

        const fillColor = getComputedStyle(document.documentElement).getPropertyValue('--icon-color').trim();

        icons.forEach(icon => {
            const svgDoc = icon.contentDocument;
            if (!svgDoc) return; 

            const elements = svgDoc.querySelectorAll('path, circle, rect, ellipse');
            
            elements.forEach(element => {
                element.setAttribute('fill', fillColor);
                element.setAttribute('stroke', fillColor);
            });
        });
    }


    function onClick(event) {
        var currentTheme = document.documentElement.getAttribute("data-color-scheme");
        var targetDataColorTheme = currentTheme == "dark" ? "light" : "dark";

        document.documentElement.setAttribute('data-color-scheme', targetDataColorTheme)
        localStorage.setItem('data-color-scheme', targetDataColorTheme);

        // set color-scheme on the comments iframe
        // As of 5.0 Ghost helper supports {{comments mode="auto" }} which will use the background color to determine if the theme is using a dark mode
        // ... but this only works after a screen refresh.  The code below will make the scheme change on clicking the dark mode toggle
        const commentsScript = document.querySelector('script[data-color-scheme]');
        if (commentsScript) {
            commentsScript.setAttribute('data-color-scheme', targetDataColorTheme);
        };

        /* update the sidebar icons */
        updateIconColor();
    }

    const icons = document.querySelectorAll('.sidebar-link-icon');
    updateIconColor();

    darkModeButton.addEventListener('click', onClick);
    lightModeButton.addEventListener('click', onClick);

  })();