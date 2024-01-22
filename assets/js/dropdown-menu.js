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
  const submenuIcon = "<svg class='dropdown-icon' xmlns='http://www.w3.org/2000/svg' width='10' height='16' fill='currentColor' viewBox='4 -4 4 16'> \
    <path d='M4.5 3.62251L1.11184 0L0 1.18875L4.5 6L9 1.18875L7.88816 0L4.5 3.62251Z'></path> \
  </svg>";
  let menuItems = document.querySelectorAll('.menu .item'); // get all the the menu items
  let i, match, submenu;
  let newElement, menuName

  /*use a superscript unicode down arrow as a drop down indicator */
  let dropdownSymbol= document.createElement("sup"); 
  dropdownSymbol.textContent=""

  /*
  go throught the menu items and create the html structure shown above
  the code expects the following html for each item:
  */
  for (i = 0; i < menuItems.length; ++i) {

    match = menuItems[i].lastElementChild.innerText.match(menuIndent);

    if (match) {
      /* remove the submenu & subitem indent indicators (- --) */
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
    /* close submenu when clicking anywhere on the menu */
    if (site.querySelector(".submenu-open")) {
      let isClickInside = site.querySelector(".submenu-open").contains(e.target);

      if (!isClickInside && site.querySelector(".submenu-open")) {
        site.querySelector(".submenu-open").classList.remove("submenu-open");
      }
    }
    /* close menu when clicking ouside the menu */
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
