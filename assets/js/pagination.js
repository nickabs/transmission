/* append more articles to a paginated article list */
export function pagination() {
    const paginationButton = document.querySelector('.pagination');
    const currentArticleList = document.querySelector('.paginated .article-card-container');
    let nextElement = document.querySelector('link[rel=next]');
    
    if (!paginationButton || !currentArticleList) return;

    if (!nextElement) {
        paginationButton.remove();
        return;
    }

    function loadNextPage() {
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'document';
        
        xhr.addEventListener('load', function() {
            if (this.status === 404) {
                paginationButton.remove();
                return;
            }

            const nextPageArticles = this.response.querySelectorAll('.article-card');
            const fragment = document.createDocumentFragment();

            nextPageArticles.forEach(item => {
                const importedItem = document.importNode(item, true);
                fragment.appendChild(importedItem);
            });

            currentArticleList.insertBefore(fragment,paginationButton);
            
            const resNextElement = this.response.querySelector('link[rel=next]');
            if (resNextElement) {
                nextElement.href = resNextElement.href;
            } else {
                paginationButton.remove();
            }
        });

        xhr.open('GET', nextElement.href);
        xhr.send(null);
    }

    paginationButton.addEventListener('click', loadNextPage);
}