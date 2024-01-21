/* 
 * create sub menu structure

    ghost menu              rendered html 
  --------------          ------------------
    Home                    <li>Home<li>
    About                   <li>About<li>
    -submenu 1              <li class="item has-submenu">submenu 1 <ul submenu>
    --subitem 1               <li class="subitem">subitem 1</li> <ul>
    --subitem 2               <li class="subitem">subitem 2</li> </ul></li>
*/

(function () {
  // this regex matches the -submenu --subitem  navigation entries
  const regex= /(^-{1,})(.*)/;
  const submenuIcon = "<svg class='submenu-dropdown-icon' xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' viewBox='0 0 16 16'> \
    <path d='M4.5 3.62251L1.11184 0L0 1.18875L4.5 6L9 1.18875L7.88816 0L4.5 3.62251Z'></path> \
  </svg>";
  // get all the the nav items
  //body > div.site > header > nav > ul > ul > li:nth-child(1)
  let menuItems = document.querySelectorAll('.item');
  let i, match, submenu;

  for (i = 0; i < menuItems.length; ++i) {

    match = menuItems[i].lastElementChild.innerText.match(regex);

    if (match) {
      //remove the submenu & subitem flags
      menuItems[i].lastElementChild.innerText = menuItems[i].lastElementChild.innerText.replace(regex,"$2");

      if (match[1].length == 1) {
        menuItems[i].classList.add("has-submenu");
        menuItems[i].innerHTML += submenuIcon;
        menuItems[i].appendChild(document.createElement('ul'));
        menuItems[i].querySelector('ul').classList="submenu";
        menuItems[i].querySelector('a').removeAttribute("href");
        menuItems[i].querySelector('a').classList.add('tabindex="0"');
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
