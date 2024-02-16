/*
 * table of contents initialistation
*/
(function () {
    tocbot.init({
    tocSelector: '.toc',
    contentSelector: '.article-content',
    hasInnerContainers: true
    })
})();


/* 
 * toggle mobile toc when toc icon is clicked
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


/*
 * update reading progress based on scroll position
*/
(function () {
  const tocToggleButton = document.querySelector('#toc-toggle');

    function updateProgress() {
      const totalHeight = document.body.clientHeight;
      const windowHeight = document.documentElement.clientHeight;
      const position = window.scrollY;
      const progress = position / (totalHeight - windowHeight)*100;
      tocToggleButton.setAttribute('progress', `${progress.toFixed(0)}%`);

      // this is used to update the circular progress bar show around the toc button
      tocToggleButton.style.setProperty(
      '--conic-gradient',
      `var(--toc-progress-color) 0deg 0%,  
       var(--toc-progress-color) 0deg ${ progress.toFixed(3) }%,
       var(--background-color) 0deg ${ 1 - progress.toFixed(3) }%,
       var(--background-color) 0deg 360deg`,
    );
    requestAnimationFrame(updateProgress);

    }
    requestAnimationFrame(updateProgress);
  })();
