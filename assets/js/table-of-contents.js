/*
 * table of contents initialistation
*/
(function () {
    tocbot.init({
    tocSelector: '.toc',
    contentSelector: '.article',
    hasInnerContainers: true
    })
    
})();

// safari fix  - toc not showing without a forced repaint - todo - retest
window.onload = function() {
  const toc = document.querySelector('.table-of-contents');
  if (toc) {
      // Force a repaint
      toc.style.display = 'none';
      toc.offsetHeight;
      toc.style.display = 'flex';
  }
};

/* 
 * toggle mobile toc when toc icon is clicked
*/
(function() {
    const tocButton = document.querySelector("#toc-toggle");
    const tableOfContents = document.querySelector(".table-of-contents");

    if (!tableOfContents) {
      return;
    }
  
    function toggleTableOfContents(){
        tableOfContents.classList.toggle("toc-open");
    }
    if (!tocButton) {
      return;
    }

    window.addEventListener('click', function(e){
      let tocOpenElement = null;
      tocOpenElement = tableOfContents.querySelector(".toc-open");

      if (tocOpenElement && tocOpenElement.contains(e.target)) {
          return;
      }

      // Close TOC when clicking outside the TOC
      if (!tableOfContents.contains(e.target) && !tocButton.contains(e.target) && tableOfContents.classList.contains("toc-open")) {
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
  if (!tocToggleButton) {
    return;
  }

  function updateProgress() {
    const totalHeight = document.body.clientHeight;
    const windowHeight = document.documentElement.clientHeight;
    const position = window.scrollY;
    const progress = position / (totalHeight - windowHeight)*100;
    tocToggleButton.setAttribute('data-progress', `${progress.toFixed(0)}%`);

    // this is used to update the circular progress bar show around the toc button
    tocToggleButton.style.setProperty(
    '--conic-gradient',
    `var(--reading-progress-color) 0deg 0%,  
      var(--reading-progress-color) 0deg ${ progress.toFixed(3) }%,
      var(--background-color) 0deg ${ 1 - progress.toFixed(3) }%,
      var(--background-color) 0deg 360deg`,
    );
    requestAnimationFrame(updateProgress);
  }
  requestAnimationFrame(updateProgress);
})();
