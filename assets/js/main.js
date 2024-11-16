import { demoOptionsPicker } from './demo.js';
import { copyLink } from './copy-link.js';
import { darkModeToggle } from './dark-mode-toggle.js';
import { enrolDialogModal } from './enrol-dialog.js';
import { lightbox } from './lightbox.js';
import { mainMenuSetup, mainNavMenuToggle, sidebarSetup } from './navigation.js'
import { pagination } from './pagination.js';
import { initialiseTocbot, toggleToc, updateTocReadingProgress } from './table-of-contents.js';

// do the dom changes for the main navigation items first
mainMenuSetup();

// sets the initial dark mode for new visitors (written to local storage)
darkModeToggle();
initialiseTocbot();

// set up interactive items
enrolDialogModal();
lightbox();
demoOptionsPicker(); // only runs on demo sites
pagination(false);

// event listenrs
mainNavMenuToggle();
toggleToc();
updateTocReadingProgress();
copyLink();

// run this last as it has to modify the icons on the sidebar and has to wait until these are loaded via network requests
sidebarSetup();
