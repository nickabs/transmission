
/* 
as of PhotoSwipe5 the script is imported as an ES module.   This means that this script must be imported into
the web page using
<script type="module" >
</scipt>
*/
import PhotoSwipeLightbox from './photoswipe-lightbox.esm.js';
(function () {
  const arrow =  ' <svg aria-hidden="true" class="pswp__icn" viewBox="0 0 32 30" width="32" height="30">\
    <path d="M26.667 14.667v2.667h-16L18 24.667l-1.893 1.893L5.547 16l10.56-10.56L18 7.333l-7.333 7.333h16z"> \
    </path> </svg>';

  const options = {
    arrowPrevSVG: arrow,
    arrowNextSVG: arrow,
    zoom: false,
    gallery: '.kg-image-card, .kg-gallery-card',
    children: 'img',
    bgOpacity: 0.8,
    closeOnScroll: true,
    Xpadding: { top: 40, bottom: 40, left: 0, right: 0 },
    pswpModule: () => import('./photoswipe.esm.js')
  };

  const lightbox = new PhotoSwipeLightbox(options);

  lightbox.init();

  /* 
  modify the item data used by photoswipe based on the attributes on the card image.
  For images without height and width variables (e.g from posts converted from wordpress 
  the attributes are retrieved from the image
  */
  lightbox.addFilter('domItemData', (itemData, element, linkEl) => {

    if (itemData) {
      itemData.w = element.getAttribute("width");
      itemData.h = element.getAttribute("height");
      if ( ! itemData.h || ! itemData.w ) {
        // get the original image size
        itemData.w = element.naturalWidth;
        itemData.h = element.naturalHeight;
      }
      itemData.src = element.getAttribute("src");
      itemData.srcset = element.getAttribute("srcset");
    }
    return itemData;
  });
})();
