/* this function will open a pop-up window asking the user to check their inbox having enrolled for a newsletter
* as of 2024/09 this is only required for newsletter registrations.  When using the portal/sign-up feature 
* Ghost automatically opens a similar window
*/
(function() {
    const dialog = document.querySelector(".enrol-dialog");
    const closeButton = document.querySelector(".enrol-dialog-button");

    closeButton.addEventListener("click", function () {
    dialog.close();
    dialog.style.display = "none";
    });

    // whatch for the additon of a success class to the DOM element
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === "class") {
            var attributeValue = mutation.target.getAttribute(mutation.attributeName);
            if (attributeValue.includes("success")) {
                dialog.showModal();
                dialog.style.display = "flex";
            }
            }
        });
    });
    // Ghost will set a class of success on the element where the data-members-form is defined 
    const form = document.querySelector("form.enrol-newsletter");

    if (form) {
        observer.observe(form, {
            attributes: true
        });
    }
})();
