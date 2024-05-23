/* 
 * create sub nav structure

   ghost navigation         rendered html
  -----------------         ------------------
    Home                    <li class="item">Home<li>
    About                   <li class="item">About<li>
    -submenu 1              <li class="item has-submenu">submenu 1 <ul class="submenu">
    --subitem 1               <li class="subitem">subitem 1</li> <ul>
    --subitem 2               <li class="subitem">subitem 2</li> </ul></li>

    * note the actual html contains <a> anchors for each item on the nav
*/

(function () {
  const menuIndentRegex= /(^-{1,})(.*)/; // match the -submenu and --subitem navigation entries
  let menuItems = document.querySelectorAll('.nav .item'); // get all the the nav items
  let i, match, submenu;
  let menuName

  /* go throught the nav items and create the html structure shown above */
  for (i = 0; i < menuItems.length; ++i) {

    match = menuItems[i].lastElementChild.innerText.match(menuIndentRegex);

    if (match) {
      /* remove the submenu & subitem indent indicators (- --) */
      menuItems[i].lastElementChild.innerText = menuItems[i].lastElementChild.innerText.replace(menuIndentRegex,"$2").trim();
      menuName=menuItems[i].lastElementChild.innerText;

      if (match[1].length == 1) { //submenu (-)
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

        const span = document.createElement('div');
        span.classList.add('submenu-header');

        const p1 = document.createElement('p');
        p1.classList.add('submenu-title');
        p1.appendChild(document.createTextNode(menuName));
        span.appendChild(p1);

        const p2 = document.createElement('button');
        p2.classList.add('submenu-close', 'icon-button');
        p2.appendChild(document.createTextNode('✕'));
        span.appendChild(p2);

        ul.appendChild(span);

        menuItems[i].replaceChildren(anchor);
        menuItems[i].appendChild(ul);
        submenu=menuItems[i];
      }
      else if (submenu) { // submenu item (--)
        /* add submenu items */
        menuItems[i].classList.add("subitem");
        menuItems[i].classList.remove("item");
        submenu.getElementsByTagName("ul")[0].appendChild(menuItems[i]);
      }
    }
  }
  /* set this class so that the nav items remain hidden until this script finishes */
  document.querySelector(".nav").classList.add("nav-ready");
})();

/* 
 * toggle nav and submenus
 * .nav.nav-open is set when the nav is opened using the hamburger button 
 * .item.submenu-open is set when an item with a submenu is opened
*/
(function() {
  const toggleMenuButton = document.querySelector(".nav-toggle");
  const closeMenuButton = document.querySelector(".nav-close");
  const nav = document.querySelector(".nav");
  const submenuItems = document.querySelectorAll(".has-submenu");

  // Toggle the main nav using the hamburger toggle 
  function toggleMenu() {
    nav.classList.toggle("nav-open");
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
      const openSubmenu = nav.querySelector(".submenu-open");
      if (openSubmenu && openSubmenu !== currentItem) {
        openSubmenu.classList.remove("submenu-open");
      }
      currentItem.classList.add("submenu-open");
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
