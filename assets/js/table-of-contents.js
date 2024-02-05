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
    const tocButton = document.querySelector("#toc-toggle");
    const tableOfContents = document.querySelector(".table-of-contents");
  
    function toggleTableOfContents(){
        tableOfContents.classList.toggle("toc-open");
    }
    if (!tocButton) {
      return;
    }

    window.addEventListener('click', function(e){
      /* close toc when clicking anywhere on the toc */
      if (tableOfContents.querySelector("toc-open")) {
        let isClickInside = tableOfContents.querySelector("toc-open").contains(e.target);
  
        if (!isClickInside && tableOfContents.querySelector("toc-open")) {
          tableOfContents.querySelector("toc-open").classList.remove("toc-open");
        }
      }
      /* close toc when clicking ouside the toc */
      if (!tableOfContents.contains(e.target) && !tocButton.contains(e.target) &&
         tableOfContents.classList.contains("toc-open")) {
            toggleTableOfContents();
      }
    });
  
    /* Toggle mobile toc */

    tocButton.addEventListener('click', toggleTableOfContents, false);
  
  })();