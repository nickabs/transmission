/* Responsive video in post content */
(function () {
    const sources = [
        '.article-content iframe[src*="youtube.com"]',
        '.article-content iframe[src*="youtube-nocookie.com"]',
        '.article-content iframe[src*="player.vimeo.com"]',
        '.article-content iframe[src*="kickstarter.com"][src*="video.html"]',
        '.article-content object',
        '.article-content embed',
    ];
    reframe(document.querySelectorAll(sources.join(',')));
})();
