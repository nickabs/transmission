/* toggle the visibility of the share share icons */
(function() {
    const sidebar= document.querySelector('.sidebar');
    if (! sidebar)
        return;
    
    function toggleExpanded() {
        sidebar.classList.toggle('share-links-expanded');
    }

    document.getElementById('share-button').addEventListener('click', toggleExpanded);

})();
