// table of contents
(function () {
    tocbot.init({
    tocSelector: '.toc',
    contentSelector: '.article-content',
    hasInnerContainers: true
    })
})();


/* 
 * toggle floating toc
*/
(function() {
    const tocButton = document.querySelector(".toc-button");
    const tableOfContents = document.querySelector(".table-of-contents");
  
    function toggleTableOfContents(){
        tableOfContents.classList.toggle("active");
    }
    if (!tocButton) {
      return;
    }

    window.addEventListener('click', function(e){
      /* close toc when clicking anywhere on the toc */
      if (tableOfContents.querySelector(".active")) {
        let isClickInside = tableOfContents.querySelector(".active").contains(e.target);
  
        if (!isClickInside && tableOfContents.querySelector(".active")) {
          tableOfContents.querySelector(".active").classList.remove("active");
        }
      }
      /* close toc when clicking ouside the toc */
      if (!tableOfContents.contains(e.target) && !tocButton.contains(e.target) &&
         tableOfContents.classList.contains("active")) {
            toggleTableOfContents();
      }
    });
  
    /* Toggle mobile toc */

    tocButton.addEventListener('click', toggleTableOfContents, false);
  
  })();