/* 
 * utilty for use with demo version of transmission 
 * create a customs options picker and set class entries on the <site> element to reflect the picked option
 *
 * the behaviour of the options is determined by demo.js
 * 
 * to enable this functionality, use code injection to insert a data-demo-site attribute to root of the doc
 *      <script>
 *          document.documentElement.setAttribute('data-demo-site', 'true');
 *      </script>
*/

export function demoOptionsPicker() {
    const demoSite = document.querySelector('[data-demo-site="true"] .site');
    const downloadIcon =`<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g id="download"> <g> <path d="M3,12.3v7a2,2,0,0,0,2,2H19a2,2,0,0,0,2-2v-7" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path> <g> <polyline data-name="Right" fill="none" id="Right-2" points="7.9 12.3 12 16.3 16.1 12.3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polyline> <line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12" x2="12" y1="2.7" y2="14.2"></line> </g> </g> </g> </g> </g></svg>`;
    const gearIcon = `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M19.19 3.757A1 1 0 0018.22 3h-4.44a1 1 0 00-.97.757l-.66 2.644a1 1 0 01-.47.623l-1.291.747a1 1 0 01-.776.095l-2.62-.75a1 1 0 00-1.142.462l-2.219 3.844a1 1 0 00.171 1.219l1.96 1.895a1 1 0 01.305.719v1.49a1 1 0 01-.305.72l-1.96 1.894a1 1 0 00-.17 1.22l2.218 3.843a1 1 0 001.141.461l2.61-.746a1 1 0 01.793.106l.963.584a1 1 0 01.43.54l.984 2.95a1 1 0 00.949.683h4.558a1 1 0 00.949-.684l.982-2.947a1 1 0 01.435-.542l.982-.587a1 1 0 01.79-.103l2.59.745a1 1 0 001.142-.461l2.222-3.848a1 1 0 00-.166-1.214l-1.933-1.896a1 1 0 01-.3-.713v-1.5a1 1 0 01.3-.713l1.933-1.896a1 1 0 00.166-1.214l-2.222-3.848a1 1 0 00-1.142-.46l-2.6.747a1 1 0 01-.774-.093l-1.31-.75a1 1 0 01-.474-.625l-.66-2.64z"></path> <circle cx="16" cy="16" r="5" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></circle> </g></svg>`;
    const downloadURL = `https://github.com/nickabs/transmission/releases/latest/download/transmission.zip`;
    const hideIcon = `<svg viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" transform="matrix(-1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11.5 4.25H6.5C5.43913 4.25 4.42178 4.67142 3.67163 5.42157C2.92149 6.17172 2.5 7.18913 2.5 8.25V18.25C2.5 19.3109 2.92149 20.3283 3.67163 21.0784C4.42178 21.8286 5.43913 22.25 6.5 22.25H16.5C17.5609 22.25 18.5783 21.8286 19.3284 21.0784C20.0786 20.3283 20.5 19.3109 20.5 18.25V13.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M21.4998 3.28998L12.0098 12.78" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M17.1396 13.37H13.4297C12.8993 13.37 12.3905 13.1593 12.0154 12.7842C11.6404 12.4092 11.4297 11.9004 11.4297 11.37V7.65997" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`
    if (!demoSite) {
        return false;
    }

    // the classes that drive the theme customisation are on the .site element
    // this a list of eacho of the custom options and their possible class mappings
    const classAlternatives = {
        style: {
            siteStyle: ['site-style-standard', 'site-style-bold', 'site-style-colorful'],
            navBarStyle: ['expanded-nav', 'minified-nav'],
            navBarOption: ['fixed-navigation-bar' , 'scrolling-navigation-bar'],
            heroStyle: ['hero-style-plain', 'hero-style-color-image', 'hero-style-grayscale-image', 'hero-style-mega']
        },
        navigation: {
            sidebarOption: ['sidebar-top','sidebar-left', 'sidebar-right', 'sidebar-bottom' , 'sidebar-none'],
            enrolOption: ['newsletter','subscribe','newsletter-subscribe','enrol-none'],
            footerOption: [ 'footer-style-all', 'footer-style-copyright-privacy', 'footer-style-copyright', 'footer-style-privacy',
                'footer-style-ghost-theme', 'footer-style-ghost', 'footer-style-none' ]
        },
        homePage: {
            focusPositionOption: ['home-page-list', 'home-page-focus-right', 'home-page-focus-left'],
            featuredArticleOption: [ 'highlight-featured-articles', 'standard-featured-articles' ],
            metadataOption: [ 'dates-on-article-cards','tags-on-article-cards', 'dates-and-tags-on-article-cards', 
                'neither-dates-or-tags-on-article-cards' ],
            authorOption: ['show-author-names', 'show-author-images', 'show-author-names-and-images', 
                    'show-author-none']
        },
        post: {
            tableOfContentsOption: ['post-toc-full','post-toc-minified','post-toc-none'],
            relatedPostsOption: ['show-related-posts', 'hide-related-posts'],
            oneTimePaymentRequest: ['show-payment-request', 'hide-payment-request']
        }
    };

   /* 
    * look up the alternative classes based on the supplied class 
    */ 
    function findClassAlternatives(currentClass) {
        for (let section in classAlternatives) {
            for (let property in classAlternatives[section]) {
                if (classAlternatives[section][property].includes(currentClass)) {
                    return { section, property, values: classAlternatives[section][property] };
                }
            }
        }
        return null;
    }

    /*
     * read all the 'demo-*' local storage keys and set the corresponding class on the site
     * this is called on every page refresh so that custom options selected by the user are persisted
    */
    function applyLocalStorageClasses() {
        Object.keys(localStorage)
            .filter(key => { return key.startsWith('demo-')})
            .forEach(key => {
                let className=key.replace(/^demo-/,'');
                let classAlternatives = findClassAlternatives(className)?.values ?? [];

                classAlternatives.forEach(alternative => demoSite.classList.remove(alternative));
                demoSite.classList.add(className);
            });
    }

    /*
     * toggles the customs option class in the .site element based on the user's selection
     * ... and records the setting in local storage so it is persisted after a page refresh
    */
    function updateSiteClass(customOption, className) {
        // look up the section based on the supplied custom option and get the list of valid classnaqmes
        const section = Object.values(classAlternatives).find(section => customOption in section);
    
        if (!section)  {
            console.error(`${customOption} is not a vaild option for the ${section} section`);
            return false;
        }
        const alternatives = section[customOption];
        if (!alternatives) {
            console.error(`${className} is not a valid class for the ${customOption} custom option`);
            return false;
        }
        alternatives.forEach(alternativeClass => {
            // remove any alternative already set on .site
            demoSite.classList.remove(alternativeClass);
            // remove any alternative already stored in local storage
            let key=`demo-${alternativeClass}`;
            localStorage.removeItem(`demo-${alternativeClass}`);
        });
        demoSite.classList.add(className);
        localStorage.setItem(`demo-${className}`,true);

    }
    
    function createDemoOptions() {
        const demoOptions = document.createElement('aside');
        demoOptions.classList.add('demo-options','options-picker-closed');

        const hideDemoOptionsPickerButton = document.createElement('button');
        hideDemoOptionsPickerButton.innerHTML = `
            ${hideIcon}
            <div class="hide-demo-options-button-description">Hide</div>
        `;

        hideDemoOptionsPickerButton.classList.add('icon','hide-demo-options-button')
        demoOptions.appendChild(hideDemoOptionsPickerButton);

        hideDemoOptionsPickerButton.addEventListener('click', () => {
            demoOptions.classList.toggle('options-picker-hidden');
        });

        const demoOptionsButton = document.createElement('button');
        demoOptionsButton.innerHTML = `
            ${gearIcon}
            <div class="demo-options-button-description">Customise</div>
        `;

        const hr = document.createElement('hr');
        demoOptions.appendChild(hr);

        demoOptionsButton.classList.add('icon','demo-options-button')
        demoOptions.appendChild(demoOptionsButton);

        demoOptionsButton.addEventListener('click', () => {
            demoOptions.classList.toggle('options-picker-closed');
        });

        const optionsPickerContainer = createOptionsPickerContainer();
        demoOptions.appendChild(optionsPickerContainer);

        const hr2 = document.createElement('hr');
        demoOptions.appendChild(hr2);

        const downloadLink = document.createElement('a');
        downloadLink.href= `${downloadURL}`
        downloadLink.classList.add('icon','download-link')
        downloadLink.innerHTML = `
            ${downloadIcon}
            <div class="download-button-description">Download theme</div>
        `;

        //<a href="path/to/yourfile.pdf" download class="download-link">Download File</a>
        demoOptions.appendChild(downloadLink);

        return demoOptions;
    }

    function createOptionsPickerContainer() {
        const container = document.createElement('div');
        container.classList.add('options-picker-container');

        const form = document.createElement('form');
        form.classList = 'options-picker-form';
    
        // Create fieldsets for each section (siteWide, home, page)
        Object.entries(classAlternatives).forEach(([sectionName, properties]) => {

            const fieldset = document.createElement('fieldset');
            fieldset.classList.add('form-fieldset');

            const legend = document.createElement('legend');

            const pretifiedSectionName = sectionName.charAt(0).toUpperCase() + sectionName.slice(1).replace(/([A-Z])/g, ' $1');

            legend.textContent = pretifiedSectionName + ' Options'; 
            
            fieldset.appendChild(legend);

            /*
             * Create form groups for each option (navBarStyle, heroStyle ...) in this section
             *  <form>
             *      <label>nav bar style</label>
             *      <select>
             *          <option>expanded-nav</option>
             *          ...
            */
            
            Object.entries(properties).forEach(([property, options]) => {
                const formGroup = document.createElement('div');
                formGroup.classList.add('form-group');
    
                const label = document.createElement('label');
                label.setAttribute('for', property);
                label.classList.add('form-label');
                label.textContent = property.replace(/([A-Z])/g, ' $1').toLowerCase();
    
                const select = document.createElement('select');
                select.id = property;
                select.classList.add('form-select');
                select.name = property;

                let placeholderOption = document.createElement('option');
                placeholderOption.value=""
                placeholderOption.selected = true; 
                placeholderOption.disabled = true; 
                placeholderOption.textContent = `Select ${"aeiou".includes(label.textContent.charAt(0).toLowerCase()) ? "an" : "a"} ${label.textContent}`;

                select.appendChild(placeholderOption);
    
                options.forEach(optionValue => {
                    const option = document.createElement('option');
                    option.value = optionValue;
                    option.textContent = optionValue;
                    select.appendChild(option);
                });
    
                select.addEventListener('change', function() {
                    updateSiteClass(property, this.value);
                });

                formGroup.appendChild(label);
                formGroup.appendChild(select);
                fieldset.appendChild(formGroup);
            });
    
            const details = document.createElement('details')
            details.open = false;

            const summary = document.createElement('summary')
            summary.textContent = `${pretifiedSectionName.toLowerCase()} options`

            details.appendChild(summary);
            details.appendChild(fieldset)
            form.appendChild(details);

            // only show one open section of the options at a time
            details.querySelector('summary').addEventListener('click', (e) => {
                document.querySelectorAll('.demo-options details').forEach(d => {
                if (d !== details) d.open = false;
                });
            });

        });
    
        container.appendChild(form);
        return container;
    }
    
    // create the html for the demo options picker 
    const demoOptionsElement = createDemoOptions();
    demoSite.appendChild(demoOptionsElement);

    // if the user has previously selected any options, reapply them:
    applyLocalStorageClasses();
}
