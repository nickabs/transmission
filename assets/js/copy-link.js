/* copy link button (copies link and shows a tooltip)  */
export function copyLink() {
  const copyLinkElement = document.querySelector(".copy-link");
  const sidebar = document.querySelector(".sidebar")

  if (!copyLinkElement || !sidebar) return;

  const handleCopyLinkClick = () => {
    // Write the current URL to the clipboard
    navigator.clipboard.writeText(window.location.href).then(() => {
      const tooltip = document.createElement('div');
      tooltip.className = 'tooltip';
      tooltip.textContent = 'Copied!';
      sidebar.appendChild(tooltip);
      setTimeout(() => tooltip.remove(), 500);
    });
  };

  copyLinkElement.addEventListener("click", handleCopyLinkClick);
}
