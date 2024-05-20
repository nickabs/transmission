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

  /* go throught the menu items and create the html structure shown above */
  for (i = 0; i < menuItems.length; ++i) {

    match = menuItems[i].lastElementChild.innerText.match(menuIndent);

    if (match) {
      /* remove the submenu & subitem indent indicators (- --) */
      menuItems[i].lastElementChild.innerText = menuItems[i].lastElementChild.innerText.replace(menuIndent,"$2");
      menuName=menuItems[i].lastElementChild.innerText;

      if (match[1].length == 1) {
        /* create parent elemement for the submenu */
        menuItems[i].classList.add("has-submenu");

        const anchor = document.createElement("a");
        anchor.setAttribute("href", "#");
        anchor.classList.add('tabindex=0');
        anchor.appendChild(document.createTextNode(menuName));

        const sup = document.createElement('sup');
        sup.appendChild(document.createTextNode(' ⌄'));
        anchor.appendChild(sup);

        const ul = document.createElement('ul');
        ul.classList.add("submenu");

        const span = document.createElement('span');
        span.classList.add('submenu-header');

        const p1 = document.createElement('p');
        p1.classList.add('submenu-title');
        p1.appendChild(document.createTextNode(menuName));
        span.appendChild(p1);

        const p2 = document.createElement('p');
        p2.classList.add('submenu-close');
        p2.appendChild(document.createTextNode('✕'));
        span.appendChild(p2);

        ul.appendChild(span);

        menuItems[i].replaceChildren(anchor);
        menuItems[i].appendChild(ul);
        submenu=menuItems[i];
      }
      else if (submenu) {
        /* add submenu items */
        menuItems[i].classList.add("subitem");
        menuItems[i].classList.remove("item");
        submenu.getElementsByTagName("ul")[0].appendChild(menuItems[i]);
      }
    }
  }
  /* set this class so that the menu items remain hidden until this script finishes */
  document.querySelector(".menu").classList.add("menu-ready");
})();

/* 
 * toggle menu and submenus
 * .menu.menu-open is set when the menu is opened using the hamburger button 
 * .item.submenu-open is set when an item with a submenu is opened
*/
(function() {
  const toggleMenuButton = document.querySelector(".menu-toggle");
  const closeMenuButton = document.querySelector(".menu-close");
  const menu = document.querySelector(".menu");
  const submenuItems = document.querySelectorAll(".has-submenu");

  // Toggle the main menu using the hamburger toggle 
  function toggleMenu() {
    menu.classList.toggle("menu-open");
  }

  function toggleSubmenu(event) {
    const currentItem = event.currentTarget;

    if (event.target.closest('.submenu')) {
      return; // Allow the link inside the submenu item 
    }

    event.preventDefault(); // Prevent the default link action that causes the page to jump
    event.stopPropagation();

    if (currentItem.classList.contains("submenu-open")) {
      currentItem.classList.remove("submenu-open");
    } else {
      const openSubmenu = menu.querySelector(".submenu-open");
      if (openSubmenu && openSubmenu !== currentItem) {
        openSubmenu.classList.remove("submenu-open");
      }
      currentItem.classList.add("submenu-open");
    }
  }

  // Close any open submenu when clicking outside
  function closeSubmenuOnClickOutside(event) {
    const openSubmenu = menu.querySelector(".submenu-open");
    if (openSubmenu && !openSubmenu.contains(event.target)) {
      openSubmenu.classList.remove("submenu-open");
    }
  }

  toggleMenuButton.addEventListener('click', toggleMenu);
  closeMenuButton.addEventListener('click', toggleMenu);

  submenuItems.forEach(item => {
    if (item.querySelector(".submenu")) {
      item.addEventListener("click", toggleSubmenu);
      item.addEventListener("keypress", function(event) {
        if (event.key === "Enter" || event.key === " ") {
          toggleSubmenu(event);
        }
      });
    }
  });

  window.addEventListener('click', closeSubmenuOnClickOutside);
})();
