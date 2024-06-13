/*
 * toggle between dark and light mode
 * if the user has set a system preference then default to that setting
 * if they specify a setting save it in local storage so it is remembered next time
 * 
*/

(function() {
    var darkModeToggle = document.getElementById("dark-mode-toggle");

    if (! darkModeToggle) {
        return;
    }

    var storedDataColorTheme = localStorage.getItem('data-color-scheme') || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

    if (storedDataColorTheme) {
        document.documentElement.setAttribute('data-color-scheme', storedDataColorTheme);
    }

    darkModeToggle.onclick = function() {
        var currentTheme = document.documentElement.getAttribute("data-color-scheme");
        var targetDataColorTheme = currentTheme == "dark" ? "light" : "dark";

        console.log("todo on click");
        document.documentElement.setAttribute('data-color-scheme', targetDataColorTheme)
        localStorage.setItem('data-color-scheme', targetDataColorTheme);

        // set color-scheme on the comments iframe
        // As of 5.0 Ghost helper supports {{comments mode="auto" }} which will use the background color to determine if the theme is using a dark mode
        // ... but this only works after a screen refresh.  The code below will make the scheme change on clicking the dark mode toggle
        const commentsScript = document.querySelector('script[data-color-scheme]');
        if (commentsScript) {
            commentsScript.setAttribute('data-color-scheme', targetDataColorTheme);
        };
    }
  })();