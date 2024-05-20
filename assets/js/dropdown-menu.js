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

  function toggleMenu(){
      menu.classList.toggle("menu-open");
  }

  /* toggle submenu */
  function toggleSubmenu(e) {
    e.preventDefault(); // stop screen scroll when opening sub menus
    if (this.classList.contains("submenu-open")) { // this submenu is already active
      this.classList.remove("submenu-open");
    } else if (menu.querySelector(".submenu-open")) {  // another submenu is active
      menu.querySelector(".submenu-open").classList.remove("submenu-open");
      this.classList.add("submenu-open");
    } else {
      this.classList.add("submenu-open"); 
    }
  }

  /* close submenu on click */
  window.addEventListener('click', function(e){
    if (menu.querySelector(".submenu-open")) {
      if (!menu.querySelector(".submenu-open").contains(e.target)) {
        menu.querySelector(".submenu-open").classList.remove("submenu-open");
      }
    }
  });

  /* Toggle mobile menu */
  toggleMenuButton.addEventListener('click', toggleMenu, false);
  closeMenuButton.addEventListener('click', toggleMenu, false);

  /* toggle submenu items */
  for (let item of submenuItems) {
    if (item.querySelector(".submenu")) {
      item.addEventListener("click", toggleSubmenu, false);
    }
    item.addEventListener("keypress", toggleSubmenu, false);
  }
})();
