/* 
* create the <li> html structure under the <nav> element used in the site-header
* the items are structured based on markup in the ghost navigation names:
* names prefixed with - indicate a submenu and -- indicates a submenu item
* for example
*
*  ghost navigation          rendered html
*  -----------------         ------------------
*  HOME                      <li class="item">
*                              <a href="http://localhost:2368/">HOME</a>
*                            </li>
*  -HONDA C90                <li class="item has-submenu">
*                                <a href="#">HONDA C90 ⌄</a>
*                                <div class="submenu">
*                                    <div class="submenu-header">
*                                        <p class="submenu-title">HONDA C90</p>
*                                        <button class="submenu-close icon">✕</button>
*                                    </div>
*                                    <ol class="submenu-items">
*  --introduction                        <li class="submenu-item">
*                                            <a href="http://localhost:2368/2019/11/16/honda-c90-introduction/">introduction</a>
*                                        </li>
*  --engine                              <li class="submenu-item">
*                                            <a href="http://localhost:2368/tag/engine/">engine</a>
*                                        </li>
*                                    </ol>
*                                </div>
*                            </li>
*/

(function () {
  const menuIndentRegex = /(^-{1,})(.*)/; // Match the -submenu and --submenu-item navigation entries

  // Function to create submenu structure
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

  // Main function to process menu items
  function processMenuItems() {
      const menuItems = document.querySelectorAll('.nav-items .item');
      let submenu = null;

      for (let i = 0; i < menuItems.length; ++i) {
          const match = menuItems[i].lastElementChild.innerText.match(menuIndentRegex);

          if (match) {
              // Remove the submenu & submenu-item indent indicators (- --)
              menuItems[i].lastElementChild.innerText = menuItems[i].lastElementChild.innerText.replace(menuIndentRegex,"$2").trim();
              const menuName=menuItems[i].lastElementChild.innerText;

              if (match[1].length == 1) { // Submenu (-)
                  menuItems[i].classList.add('has-submenu');

                  const anchor = document.createElement("a");
                  anchor.setAttribute("href", "#");
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
 * toggle nav and submenus
 * .nav.nav-open is set when the nav is opened using the hamburger button 
 * .submenu.submenu-open is set when an item with a submenu is opened
*/
(function() {
  const toggleMenuButton = document.querySelector(".nav-toggle");
  const closeMenuButton = document.querySelector(".nav-close");
  const nav = document.querySelector(".nav");
  const submenus = document.querySelectorAll(".item.has-submenu > *");

  // Toggle the main nav using the hamburger toggle 
  function toggleMenu() {
    nav.classList.toggle("nav-open");
  }

  function toggleSubmenu(event) {
    const selectedItem = event.target.parentNode;

    if (selectedItem.classList.contains("has-submenu")) {
      event.preventDefault(); // prevent the default link action from causing the page to jump to top of screen

      // if another submenu is already open, close it
      const openSubmenu = nav.querySelector(".submenu-open");
      if (openSubmenu && openSubmenu !== selectedItem) { 
        openSubmenu.classList.remove("submenu-open");
      }

      selectedItem.querySelector(".submenu").classList.toggle("submenu-open");

    }
  }

  // Close any open submenu when clicking outside
  function closeSubmenuOnClickOutside(event) {
    const openSubmenu = nav.querySelector(".submenu-open");
    if (openSubmenu) {
      const submenuToggle = openSubmenu.closest('.has-submenu'); // Find the parent with 'has-submenu'
      const submenuHeader = openSubmenu.querySelector('.submenu-header'); // Find the submenu header

      if (!openSubmenu.contains(event.target) && 
          !submenuToggle.contains(event.target) ||
          (submenuHeader && submenuHeader.contains(event.target))) {
        openSubmenu.classList.remove("submenu-open");
      }
    }
  }

  toggleMenuButton.addEventListener('click', toggleMenu);
  closeMenuButton.addEventListener('click', toggleMenu);
 
  submenus.forEach(submenu => {
    submenu.addEventListener("click", toggleSubmenu);
    submenu.addEventListener("keypress", function(event) {
      if (event.key === "Enter" || event.key === " ") {
        toggleSubmenu(event);
      }
    });
  });

  window.addEventListener('click', closeSubmenuOnClickOutside);
})();
