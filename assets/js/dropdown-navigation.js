/* 
* create the <li> html structure under the <nav> element used in the site-header
* the items are structured based on markup in the ghost navigation names:
* names prefixed with - indicate a submenu and -- indicates a submenu item
* for example
*
*  ghost navigation          rendered html
*  -----------------         ------------------
*  HOME                      <li class='item'>
*                              <a href='http://localhost:2368/'>HOME</a>
*                            </li>
*  -HONDA C90                <li class='item has-submenu'>
*                                <a href='#'>HONDA C90 ⌄</a>
*                                <div class='submenu'>
*                                    <div class='submenu-header'>
*                                        <p class='submenu-title'>HONDA C90</p>
*                                        <button class='submenu-close icon'>✕</button>
*                                    </div>
*                                    <ol class='submenu-items'>
*  --introduction                        <li class='submenu-item'>
*                                            <a href='http://localhost:2368/2019/11/16/honda-c90-introduction/'>introduction</a>
*                                        </li>
*  --engine                              <li class='submenu-item'>
*                                            <a href='http://localhost:2368/tag/engine/'>engine</a>
*                                        </li>
*                                    </ol>
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

      const p2 = document.createElement('button');
      p2.classList.add('submenu-close', 'icon');
      p2.appendChild(document.createTextNode('✕'));
      div1.appendChild(p2);

      div.appendChild(div1);

      const ol = document.createElement('ol');
      ol.classList.add('submenu-items');

      div.appendChild(ol);

      return div;
  }

  function processMenuItems() {
      const menuItems = document.querySelectorAll('.nav-items .item');
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
                  menuItems[i].classList.remove('item');
                  submenu.querySelector('.submenu-items').appendChild(menuItems[i]);
              }
          }
      }
      document.querySelector('.nav').classList.add('nav-ready');
  }

  processMenuItems();
})();

/* 
 * open/close nav (main) menu and submenus
 * .nav.active-nav is set when the nav is opened using the hamburger button 
 * .submenu.active-submenu is set when an item with a submenu is opened
*/
(function() {
  const nav = document.querySelector('.nav');
  const navToggle = document.querySelector('.nav-toggle');

  function handleDocumentClick(event) {
    let activeSubmenu = nav.querySelector('.active-submenu');
    let clickedItem;

    // when a submenu item is clicked no need to do anythng further (new page will open)
    if (event.target.closest(".submenu-item")) {
      return;
    }
    else if (event.target.closest(".item") && ! event.target.closest(".submenu-header")) { // do not count a click on a submenu header as a clicked item
      clickedItem= event.target.closest(".item");
    }

    if (clickedItem) {
      if (activeSubmenu) { // close any previously opened submenu
        activeSubmenu.classList.remove('active-submenu');
      }
      if (clickedItem.classList.contains("has-submenu")) {
        clickedItem.querySelector(".submenu").classList.add('active-submenu');
      }
      return;
    }

    // toggle nav if the hamburger menu is clicked
    if (event.target.closest('.nav-toggle')) {
      nav.classList.toggle('active-nav');
      return;
    }

    // when click is outside of menus, close the latest menu
    if (activeSubmenu) { // close any previously opened submenu
      activeSubmenu.classList.remove('active-submenu');
    }
    else if (nav.classList.contains('active-nav')) {
        nav.classList.remove('active-nav');
    }
  }

  document.addEventListener('click', handleDocumentClick);
})();
