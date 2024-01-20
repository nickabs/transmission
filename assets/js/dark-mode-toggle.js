
(function() {
    var darkModeToggle = document.getElementById("dark-mode-toggle");

    if (darkModeToggle) {
        var storedTheme = localStorage.getItem('theme') || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
        if (storedTheme)
            document.documentElement.setAttribute('data-theme', storedTheme)

        setTimeout(function() {
            var targetTheme = storedTheme == "dark" ? "light" : "dark";
        }, 1000);

        darkModeToggle.onclick = function() {
            var currentTheme = document.documentElement.getAttribute("data-theme");
            var targetTheme = "light";

            if (currentTheme === "light") {
                targetTheme = "dark";
            }

            document.documentElement.setAttribute('data-theme', targetTheme)
            localStorage.setItem('theme', targetTheme);

        };
    }
})();