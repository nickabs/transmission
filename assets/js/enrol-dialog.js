/* this function will open a pop-up window asking the user to check their inbox having enrolled for a newsletter
* as of 2024/09 this is only required for newsletter registrations.  When using the portal/sign-up feature 
* Ghost automatically opens a similar window
*/
export function enrolDialogModal() {
    const dialog = document.querySelector(".enrol-dialog");
    const closeButton = document.querySelector(".enrol-dialog-button");
    const form = document.querySelector("form.enrol-newsletter");

    if (dialog && closeButton) {
        closeButton.addEventListener("click", () => {
            dialog.close();
            dialog.style.display = "none"; 
        });
    }

    if (form) {
        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.attributeName === "class" && mutation.target.classList.contains("success")) {
                    dialog.showModal();
                    dialog.style.display = "flex";
                    break; 
                }
            }
        });
        observer.observe(form, { attributes: true, attributeFilter: ["class"] });
    }
};
