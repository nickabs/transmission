/* 
* create the <li> html structure under the <nav> element used in the site-header
* the items are structured based on markup in the ghost navigation names:
* names prefixed with - indicate a submenu and -- indicates a submenu item
* for example
*
*  ghost navigation          rendered html
*  -----------------         ------------------
*  HOME                      <li class='main-nav-link-item'>
*                              <a href='http://localhost:2368/'>HOME</a>
*                            </li>
*  -HONDA C90                <li class='main-nav-link-item has-submenu'>
*                                <a href='#'>HONDA C90 ⌄</a>
*                                <div class='submenu'>
*                                    <div class='submenu-header'>
*                                        <p class='submenu-title'>HONDA C90</p>
*                                    </div>
*                                    <ul class='submenu-items'>
*  --introduction                        <li class='submenu-item'>
*                                            <a href='http://localhost:2368/2019/11/16/honda-c90-introduction/'>introduction</a>
*                                        </li>
*  --engine                              <li class='submenu-item'>
*                                            <a href='http://localhost:2368/tag/engine/'>engine</a>
*                                        </li>
*                                    </ul>
*                                </div>
*                            </li>
*/

(function () {
  const menuIndentRegex = /(^-{1,})(.*)/; // Match the -submenu and --submenu-item navigation entries

  function createSubMenu(menuName) {
      const div = document.createElement('div');
      div.classList.add('submenu');

      const div1 = document.createElement('div');
      div1.classList.add('submenu-header');

      const p1 = document.createElement('p');
      p1.classList.add('submenu-title');
      p1.appendChild(document.createTextNode(menuName));
      div1.appendChild(p1);

      div.appendChild(div1);

      const ul = document.createElement('ul');
      ul.classList.add('submenu-items');

      div.appendChild(ul);

      return div;
  }

  function processMenuItems() {
      const menuItems = document.querySelectorAll('.main-nav-links .main-nav-link-item');
      let submenu = null;

      for (let i = 0; i < menuItems.length; ++i) {
          const match = menuItems[i].lastElementChild.innerText.match(menuIndentRegex);

          if (match) {
              // Remove the submenu & submenu-item indent indicators (- --)
              menuItems[i].lastElementChild.innerText = menuItems[i].lastElementChild.innerText.replace(menuIndentRegex,'$2').trim();
              const menuName=menuItems[i].lastElementChild.innerText;

              if (match[1].length == 1) { // Submenu (-)
                  menuItems[i].classList.add('has-submenu');

                  const anchor = document.createElement('a');
                  anchor.setAttribute('href', '#');
                  anchor.classList.add('tabindex=0');
                  anchor.appendChild(document.createTextNode(menuName));
          
                  const sup = document.createElement('sup');
                  sup.appendChild(document.createTextNode(' ⌄'));
                  anchor.appendChild(sup);

                  const div = createSubMenu(menuName);
                  menuItems[i].replaceChildren(anchor);
                  menuItems[i].appendChild(div);
                  submenu = menuItems[i];
              } else if (submenu) { // Submenu item (--)
                  menuItems[i].classList.add('submenu-item');
                  menuItems[i].classList.remove('main-nav-link-item');
                  submenu.querySelector('.submenu-items').appendChild(menuItems[i]);
              }
          }
      }
      document.querySelector('.main-nav-links-container').classList.add('main-nav-links-ready');
  }

  processMenuItems();
})();

/* 
 * open/close nav (main) menu and submenus
 * .main-nav-links-container.main-nav-links-active is set when the nav is opened using the hamburger button 
 * .submenu.active-submenu is set when an item with a submenu is opened
*/
(function() {
  const nav = document.querySelector('.main-nav-links-container');
  const navToggle = document.querySelector('.main-nav-links-toggle');

  function handleDocumentClick(event) {
    let activeSubmenu = nav.querySelector('.active-submenu');
    let clickedItem;


    // when a submenu item is clicked no need to do anythng further (new page will open)
    if (event.target.closest(".submenu-item")) {
      return;
    }
    else if (event.target.closest(".main-nav-link-item") && ! event.target.closest(".submenu-header")) { // do not count a click on a submenu header as a clicked item
      clickedItem= event.target.closest(".main-nav-link-item");
    }

    if (clickedItem) {
      if (clickedItem.classList.contains('has-submenu')) {
        event.preventDefault(); // prevent the page scrolling to the top when a menu item is clicked;
      }

      if (activeSubmenu) { // close any previously opened submenu
        activeSubmenu.classList.remove('active-submenu');
      }

      if (! clickedItem.contains(activeSubmenu)) { // do not reopen the submenu item if it was closed by the statement above
        if (clickedItem.classList.contains("has-submenu")) {
          clickedItem.querySelector(".submenu").classList.add('active-submenu');
        }
      }

      return;
    }

    // toggle nav if the hamburger menu is clicked
    if (event.target.closest('.main-nav-links-toggle')) {
      nav.classList.toggle('main-nav-links-active');
      return;
    }

    // when click is outside of menus, close the latest menu
    if (activeSubmenu) { // close any previously opened submenu
      activeSubmenu.classList.remove('active-submenu');
    }
    else if (nav.classList.contains('main-nav-links-active')) {
        nav.classList.remove('main-nav-links-active');
    }
  }

  document.addEventListener('click', handleDocumentClick);
})();


/*
 * open/close nav link item menu 
 * note the user decides whether to include share or secondary links, so they may be null 
*/
(function() {
    const containers = {
        share: document.querySelector('.share-links-container'),
        secondary: document.querySelector('.secondary-links-container'),
        sidebar: document.querySelector('.sidebar')
    };

    function toggle(container) {
        container.classList.toggle('display-item-details');
    }

    document.addEventListener('click', function(event) {
        const { share, secondary, sidebar } = containers;

        const clickedLink = event.target.closest('a');
        if (sidebar?.contains(event.target) && clickedLink) {
            return;
        }

        if (share?.contains(event.target)) {
            toggle(share);
            if (secondary?.classList.contains('display-item-details')) toggle(secondary);
            if (sidebar?.classList.contains('display-item-details')) toggle(sidebar);
            return;
        }

        if (secondary?.contains(event.target)) {
            toggle(secondary);
            if (share?.classList.contains('display-item-details')) toggle(share);
            if (sidebar?.classList.contains('display-item-details')) toggle(sidebar);
            return;
        }

        if (sidebar?.contains(event.target)) {
            toggle(sidebar);
            if (share?.classList.contains('display-item-details')) toggle(share);
            if (secondary?.classList.contains('display-item-details')) toggle(secondary);
            return;
        }

        /* close open menus when clicking outside */
        if (share?.classList.contains('display-item-details')) toggle(share);
        if (secondary?.classList.contains('display-item-details')) toggle(secondary);
    });
    /* 
     * remove the secondary nav indicator (e.g ##1-) from internal tag names. The number is optional and there to sort the icons
     *
     * make the sidebar icons 20px x 20px:
     *  the svg element is embeded from the tag's feature_post image into the HTML so that we can dynamically adjut the 
     *  color according to dark mode settings (see dark-mode-toggle.js). 
     *  as a consequence, we can't control the height /width with css and have to do it here instead
    */
    const internalTagItems = document.querySelectorAll('.internal-tags .sidebar-link-item');
    if (internalTagItems) {
        internalTagItems.forEach(item => {
            const description  = item.querySelector('.sidebar-link-description');
            const icon = item.querySelector('.sidebar-link-icon');
            const svgDoc = icon.contentDocument;
            const regex = /^##[0-9]*-/;  // this is the pattern of internal nag names that are to be used for secondary navigation

            if (description) {
                if (regex.test(description.textContent)) {
                    description.textContent = description.textContent.replace(regex,'');
                } else {
                    item.remove(); // standard internal tags (these start with a single #) are not used in the navigation
                }
            }

            if (svgDoc) {
                const svgElement = svgDoc.querySelector('svg');
                if (svgElement) {
                    const viewBox = svgElement.getAttribute('viewBox');
                    const naturalWidth = svgElement.getAttribute('width');
                    const naturalHeight = svgElement.getAttribute('height');
                    if (!viewBox) {
                        if (!naturalWidth || !naturalHeight){
                            const bbox = svgElement.getBBox(); // Returns the bounding box of the element
                            svgElement.setAttribute('viewBox', `0 0 ${bbox.width} ${bbox.height}`);
                        } else {
                            svgElement.setAttribute('viewBox', `0 0 ${naturalWidth} ${naturalHeight}`);
                        }
                    }
                    svgElement.setAttribute('height', '20px');
                    svgElement.setAttribute('width', '20px');
                }
            }

            icon.classList.remove('hidden'); // only show the image after it is resized
        });

        // for the secondary link items we use the first two characters of the words in the description instead of an icon
        const secondaryLinksItems = document.querySelectorAll('.secondary-links .sidebar-link-item');
        if (secondaryLinksItems) {
            secondaryLinksItems.forEach(item => {
                const span = document.createElement('span');
                const itemDescription = item.querySelector('.sidebar-link-description') ;
                if (itemDescription) {
                    const words = itemDescription.textContent.replace(/[^a-zA-Z0-9\s]/g, ' ').trim().split(/\s+/);

                    let firstLetters = words.slice(0, 2).map(word => word.charAt(0).toUpperCase()).join('');

                    if (words.length === 1) {
                        firstLetters=(itemDescription.textContent.slice(0, 2)).toUpperCase();
                    }

                    span.textContent = firstLetters;
                    span.classList.add('sidebar-link-icon');
                    const link=item.querySelector('.sidebar-link');
                    if (link) {
                        link.insertBefore(span,link.firstChild);
                    }
                }
            });
        }
    }
})();
