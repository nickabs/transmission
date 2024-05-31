/* copy link button (copies link and shows a tooltip)  */
(function() {
    const copyLinkElement = document.getElementById("copy-link")  ;
    if (! copyLinkElement)
        return;

    function copyLink() {
        navigator.clipboard.writeText(window.location.href);

        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = 'Copied!';
        copyLinkElement.appendChild(tooltip);

        setTimeout(() => { tooltip.remove(); }, 1000);
    }
    copyLinkElement.addEventListener("click", copyLink, false);
})();