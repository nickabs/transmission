
(function() {
    var darkModeToggle = document.getElementById("dark-mode-toggle");

    if (darkModeToggle) {
        var storedTheme = localStorage.getItem('theme') || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
        if (storedTheme)
            document.documentElement.setAttribute('data-theme', storedTheme)

        setTimeout(function() {
            var targetTheme = storedTheme == "dark" ? "light" : "dark";
        }, 1000);

        darkModeToggle.onclick = function() {
            var currentTheme = document.documentElement.getAttribute("data-theme");
            var targetTheme = "light";

            if (currentTheme === "light") {
                targetTheme = "dark";
            }

            document.documentElement.setAttribute('data-theme', targetTheme)
            localStorage.setItem('theme', targetTheme);

        };
    }
})();
/* 
 * create sub menu structure

   ghost menu              rendered html
  --------------          ------------------
    Home                    <li class="item">Home<li>
    About                   <li class="item">About<li>
    -submenu 1              <li class="item has-submenu">submenu 1 <ul class="submenu">
    --subitem 1               <li class="subitem">subitem 1</li> <ul>
    --subitem 2               <li class="subitem">subitem 2</li> </ul></li>

    * note the actual html contains <a> anchors for each item on the menu
*/

(function () {
  const menuIndent= /(^-{1,})(.*)/; // this regex matches the -submenu --subitem navigation entries
  let menuItems = document.querySelectorAll('.menu .item'); // get all the the menu items
  let i, match, submenu;
  let newElement, menuName

  // use a superscript unicode down arrow as a drop down indicator 
  let dropdownSymbol= document.createElement("sup"); 
  dropdownSymbol.textContent=""

  /*
  go throught the menu items and create the html structure shown above
  the code expects the following html for each item:
  */
  for (i = 0; i < menuItems.length; ++i) {

    match = menuItems[i].lastElementChild.innerText.match(menuIndent);

    if (match) {
      // remove the submenu & subitem indent indicators (- --) 
      menuItems[i].lastElementChild.innerText = menuItems[i].lastElementChild.innerText.replace(menuIndent,"$2");
      menuName=menuItems[i].lastElementChild.innerText;

      if (match[1].length == 1) {
        menuItems[i].classList.add("has-submenu");
        menuItems[i].replaceChildren(document.createElement("a"));
        menuItems[i].querySelector('a').setAttribute("href","#");
        menuItems[i].querySelector('a').appendChild(document.createTextNode(menuName));
        menuItems[i].querySelector('a').appendChild(document.createElement('sup'));
        menuItems[i].querySelector('sup').appendChild(document.createTextNode('⌄'));
        menuItems[i].appendChild(document.createElement('ul'));
        menuItems[i].querySelector('ul').classList="submenu";
        menuItems[i].querySelector('a').classList.add('tabindex=0');
        submenu=menuItems[i];
      }
      else if (submenu) {
        menuItems[i].classList.add("subitem");
        menuItems[i].classList.remove("item");
        submenu.getElementsByTagName("ul")[0].appendChild(menuItems[i]);
      }
    }
  }
  // set this class so that the menu items remain hidden until this script finishes
  document.querySelector(".menu").classList.add("menu-ready");
})();

/* 
 * toggle menu and submenus
 * .site.menu-open is set when the menu is opened using the hamburger button (used on small screens)
 * item.submenu-open is set when an item with a submenu is clicked (can be used on both mobile and widescreen)
*/
(function() {
  const openMenuButton = document.querySelector(".open-menu");
  const closeMenuButton = document.querySelector(".close-menu");
  const site = document.querySelector(".site");
  const submenuItems = document.querySelectorAll(".has-submenu");

  function toggleMenu(){
      site.classList.toggle("menu-open");
  }

  /* toggle submenu */
  function toggleItem() {
    if (this.classList.contains("submenu-open")) { // this submenu is already active
      this.classList.remove("submenu-open");
    } else if (site.querySelector(".submenu-open")) {  // another submenu is active
      site.querySelector(".submenu-open").classList.remove("submenu-open");
      this.classList.add("submenu-open");
    } else {
      this.classList.add("submenu-open"); 
    }

  }

  /* close menus on click */
  window.addEventListener('click', function(e){
    // close submenu when clicking anywhere on the menu 
    if (site.querySelector(".submenu-open")) {
      let isClickInside = site.querySelector(".submenu-open").contains(e.target);

      if (!isClickInside && site.querySelector(".submenu-open")) {
        site.querySelector(".submenu-open").classList.remove("submenu-open");
      }
    }
    // close menu when clicking ouside the menu 
    if (!site.contains(e.target) && !openMenuButton.contains(e.target) &&
       site.classList.contains("menu-open")) {
          toggleMenu();
    }
  });

  /* Toggle mobile menu */
  openMenuButton.addEventListener('click', toggleMenu, false);
  closeMenuButton.addEventListener('click', toggleMenu, false);

  /* toggle submenu items */
  for (let item of submenuItems) {
    if (item.querySelector(".submenu")) {
      item.addEventListener("click", toggleItem, false);
    }
    item.addEventListener("keypress", toggleItem, false);
  }
})();

/* pagination */
(function (isInfinite, callback) {
    var buttonElement = document.querySelector('.load-more');

    // next link element
    var nextElement = document.querySelector('link[rel=next]');
    if (!nextElement && buttonElement) {
        buttonElement.remove();
        return;
    }

    // post list element
    var currentArticleList = document.querySelector('.paginated');
    if (!currentArticleList) {
        return;
    }

    var buffer = 300;

    var ticking = false;
    var loading = false;

    var lastScrollY = window.scrollY;
    var lastWindowHeight = window.innerHeight;
    var lastDocumentHeight = document.documentElement.scrollHeight;

    function onPageLoad() {
        if (this.status === 404) {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onResize);
            buttonElement.remove();
            return;
        }

        // append next page of article-cards
        var nextPageArticleList = this.response.querySelectorAll('.paginated > .article-card');
        var fragment = document.createDocumentFragment();
        var elems = [];
        nextPageArticleList.forEach(function (item) {
            // document.importNode is important, without it the item's owner
            // document will be different which can break resizing of
            // `object-fit: cover` images in Safari

            var clonedItem = document.importNode(item, true);

            if (callback) {
                clonedItem.style.position = 'absolute';
                clonedItem.style.visibility = 'hidden';
                elems.push(clonedItem);
            }

            fragment.appendChild(clonedItem);
        });

        currentArticleList.appendChild(fragment);

        if (callback) {
            callback(elems);
        }

        // set next link
        var resNextElement = this.response.querySelector('link[rel=next]');
        if (resNextElement) {
            nextElement.href = resNextElement.href;
        } else {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onResize);
            if (buttonElement) {
                buttonElement.remove();
            }
        }

        // sync status
        lastDocumentHeight = document.documentElement.scrollHeight;
        ticking = false;
        loading = false;

        if (isInfinite) {
            imagesLoaded(currentArticleList, function () {
                if (currentArticleList.getBoundingClientRect().bottom <= lastWindowHeight) {
                    console.log(currentArticleList.getBoundingClientRect().bottom, lastWindowHeight)
                    requestTick();
                }
            });
        }
    }

    function onUpdate() {
        // return if already loading
        if (loading) {
            return;
        }

        // return if not scroll to the bottom
        if (isInfinite && lastScrollY + lastWindowHeight <= lastDocumentHeight - buffer) {
            ticking = false;
            return;
        }

        loading = true;

        var xhr = new window.XMLHttpRequest();
        xhr.responseType = 'document';

        xhr.addEventListener('load', onPageLoad);

        xhr.open('GET', nextElement.href);
        xhr.send(null);
    }

    function requestTick() {
        ticking || window.requestAnimationFrame(onUpdate);
        ticking = true;
    }

    function onScroll() {
        lastScrollY = window.scrollY;
        requestTick();
    }

    function onResize() {
        lastWindowHeight = window.innerHeight;
        lastDocumentHeight = document.documentElement.scrollHeight;
        requestTick();
    }

    if (isInfinite) {
        window.addEventListener('scroll', onScroll, {passive: true});
        window.addEventListener('resize', onResize);
        requestTick();
    } else {
        buttonElement.addEventListener('click', requestTick);
    }
})(false);

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

/* 
as of PhotoSwipe5 the script is imported as an ES module.   This means that this script must be imported into
the web page using
<script type="module" >
</scipt>
*/
import PhotoSwipeLightbox from './photoswipe-lightbox.esm.js';
(function () {
  const arrow =  ' <svg aria-hidden="true" class="pswp__icn" viewBox="0 0 32 30" width="32" height="30">\
    <path d="M26.667 14.667v2.667h-16L18 24.667l-1.893 1.893L5.547 16l10.56-10.56L18 7.333l-7.333 7.333h16z"> \
    </path> </svg>';

  const options = {
    arrowPrevSVG: arrow,
    arrowNextSVG: arrow,
    zoom: false,
    gallery: '.kg-image-card, .kg-gallery-card',
    children: 'img',
    bgOpacity: 0.8,
    closeOnScroll: true,
    Xpadding: { top: 40, bottom: 40, left: 0, right: 0 },
    pswpModule: () => import('./photoswipe.esm.js')
  };

  const lightbox = new PhotoSwipeLightbox(options);

  lightbox.init();

  /* 
  modify the item data used by photoswipe based on the attributes on the card image.
  For images without height and width variables (e.g from posts converted from wordpress 
  the attributes are retrieved from the image
  */
  lightbox.addFilter('domItemData', (itemData, element, linkEl) => {

    if (itemData) {
      itemData.w = element.getAttribute("width");
      itemData.h = element.getAttribute("height");
      if ( ! itemData.h || ! itemData.w ) {
        // get the original image size
        itemData.w = element.naturalWidth;
        itemData.h = element.naturalHeight;
      }
      itemData.src = element.getAttribute("src");
      itemData.srcset = element.getAttribute("srcset");
    }
    return itemData;
  });
})();
