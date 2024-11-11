import { demoOptionsPicker } from './demo.js';
import { copyLink } from './copy-link.js';
import { darkModeToggle } from './dark-mode-toggle.js';
import { enrolDialogModal } from './enrol-dialog.js';
import { lightbox } from './lightbox.js';
import { mainMenuSetup, mainNavMenuToggle, sidebarSetup } from './navigation.js'
import { pagination } from './pagination.js';
import { initialiseTocbot, toggleToc, updateTocReadingProgress } from './table-of-contents.js';
import { Prism } from 'prismjs';
import 'prismjs/components/prism-javascript.min.js';
import 'prismjs/components/prism-nginx.js';
import 'prismjs/components/prism-bash.min.js';
import 'prismjs/plugins/command-line/prism-command-line.js';

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