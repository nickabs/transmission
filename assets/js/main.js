import { demoOptionsPicker } from './demo.js';
import { copyLink } from './copy-link.js';
import { darkModeToggle } from './dark-mode-toggle.js';
import { enrolDialog } from './enrol-dialog.js';
import { lightbox } from './lightbox.js';
import { createMainNavMenu, mainNavMenuToggle, sidebarToggle } from './navigation.js'
import { pagination } from './pagination.js';
import { initialiseTocbot, toggleToc, updateTocReadingProgress } from './table-of-contents.js';

demoOptionsPicker();
copyLink();
darkModeToggle();
enrolDialog();
lightbox();
createMainNavMenu();
mainNavMenuToggle();
sidebarToggle();
pagination(false);
initialiseTocbot();
toggleToc();
updateTocReadingProgress();

console.log('import todo');