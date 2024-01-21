/* pagination */
(function (isInfinite, callback) {
    var buttonElement = document.querySelector('.load-more');

    // next link element
    var nextElement = document.querySelector('link[rel=next]');
    if (!nextElement && buttonElement) {
        buttonElement.remove();
        return;
    }

    // post list element
    var listElement = document.querySelector('.with-pagination:not(.featured):not(.related)');
    if (!listElement) {
        return;
    }

    var buffer = 300;

    var ticking = false;
    var loading = false;

    var lastScrollY = window.scrollY;
    var lastWindowHeight = window.innerHeight;
    var lastDocumentHeight = document.documentElement.scrollHeight;

    function onPageLoad() {
        if (this.status === 404) {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onResize);
            buttonElement.remove();
            return;
        }

        // append contents
        var postElements = this.response.querySelectorAll('.with-pagination:not(.featured):not(.related) > *');
        var fragment = document.createDocumentFragment();
        var elems = [];

        postElements.forEach(function (item) {
            // document.importNode is important, without it the item's owner
            // document will be different which can break resizing of
            // `object-fit: cover` images in Safari
            var clonedItem = document.importNode(item, true);

            if (callback) {
                clonedItem.style.position = 'absolute';
                clonedItem.style.visibility = 'hidden';
                elems.push(clonedItem);
            }

            fragment.appendChild(clonedItem);
        });

        listElement.appendChild(fragment);

        if (callback) {
            callback(elems);
        }

        // set next link
        var resNextElement = this.response.querySelector('link[rel=next]');
        if (resNextElement) {
            nextElement.href = resNextElement.href;
        } else {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onResize);
            if (buttonElement) {
                buttonElement.remove();
            }
        }

        // sync status
        lastDocumentHeight = document.documentElement.scrollHeight;
        ticking = false;
        loading = false;

        if (isInfinite) {
            imagesLoaded(listElement, function () {
                if (listElement.getBoundingClientRect().bottom <= lastWindowHeight) {
                    console.log(listElement.getBoundingClientRect().bottom, lastWindowHeight)
                    requestTick();
                }
            });
        }
    }

    function onUpdate() {
        // return if already loading
        if (loading) {
            return;
        }

        // return if not scroll to the bottom
        if (isInfinite && lastScrollY + lastWindowHeight <= lastDocumentHeight - buffer) {
            ticking = false;
            return;
        }

        loading = true;

        var xhr = new window.XMLHttpRequest();
        xhr.responseType = 'document';

        xhr.addEventListener('load', onPageLoad);

        xhr.open('GET', nextElement.href);
        xhr.send(null);
    }

    function requestTick() {
        ticking || window.requestAnimationFrame(onUpdate);
        ticking = true;
    }

    function onScroll() {
        lastScrollY = window.scrollY;
        requestTick();
    }

    function onResize() {
        lastWindowHeight = window.innerHeight;
        lastDocumentHeight = document.documentElement.scrollHeight;
        requestTick();
    }

    if (isInfinite) {
        window.addEventListener('scroll', onScroll, {passive: true});
        window.addEventListener('resize', onResize);
        requestTick();
    } else {
        buttonElement.addEventListener('click', requestTick);
    }
})(false);
