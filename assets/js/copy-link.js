/* copy link button (copies link and shows a tooltip) */
(function() {
    const socialLinkIconCopy = document.querySelector(".social-link-icon-copy")  ;
    if (! socialLinkIconCopy)
        return;

    function copyLink() {
        navigator.clipboard.writeText(window.location.href);

        socialLinkIconCopy.insertAdjacentHTML('afterend','<div class=copy-link-tooltip>copied</div>');

        setTimeout( () => {
            document.querySelectorAll('.copy-link-tooltip').forEach(el => el.remove()); 
        }, 1000);
    }


    socialLinkIconCopy.addEventListener("click", copyLink, false);
})();