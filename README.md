# Transmission
[features](#features) |
[drop down navigation](#drop-down-navigation-configuration) |
[demo](#demo) |
[download](#download-and-install) |
[developer information](#for-developers) |
[making changes](#make-changes-to-the-theme)

Transmission is a modern [Ghost](https://ghost.org/) theme.

widescreen, tablet and mobile layouts:
![v1 11 home](https://github.com/nickabs/transmission/assets/4947488/68a22a33-b9d4-49d9-aad6-97106274187d)

![v1 11 page](https://github.com/nickabs/transmission/assets/4947488/ac2b58a8-5da7-4646-b93d-88670597061b)

# Features
This theme is optimised for traditional blog sites, particularly sites with lots of content and long articles. Features include:

- dark mode toggle (dark mode will default to the operating system setting, but can be overridden by the user)
- dropdown navigation menu: expanded or minimised (hamburger) options
- table of contents for long articles, including a reading progress indicator - works in both mobile and laptop views)
- sharing icons (facebook, twitter, whatsapp, copy link)
- Search
- Tags and authors page
- modern Inter and Menelo font families are installed with the theme
- infinite pagination (will display a button to Load More posts)
- home page and article collection layout options

# Lighthouse scores

<div align="center">
    <img height="250" alt="drop down navigation" src="https://github.com/nickabs/transmission/assets/4947488/2b30ed75-00fd-4156-8e42-42a59afaf3e4">
    <img height="250" alt="drop down navigation demo" src="https://github.com/nickabs/transmission/assets/4947488/ba34f557-5a10-48d3-8541-d8e96d6975ec">
</div>

# Drop down navigation configuration
A two level drop down nav can be created using the standard Ghost naviagion feature (settings > navigation).
When the navigation item name is preceeded by a single dash it will show as a parent item and any item with two dashes immediately following it will show as a child item.  For instance:

<div align="center">
    <img height="250" alt="drop down navigation" src="https://github.com/nickabs/transmission/assets/4947488/4cefbbd5-284f-45fe-be4c-5db69f95387f">
    <img height="250" alt="drop down navigation demo" src="https://github.com/nickabs/transmission/assets/4947488/86f961d5-c2f4-4b3b-be6e-06930f4c1a5e">
</div>

# Demo

[See the theme in action](https://smallworkshop.co.uk).

# Download and Install

Download the latest zip file from the [Releases](https://github.com/nickabs/transmission/releases) page and install it to your site via the Ghost admin tools.

# For developers

- build controlled by gulp, including support for ES Modules
- minimal dependencies using the latest versions
    - image gallery (photowsipe)
    - code syntax highlighting (prism)
    - table of content (tocbot)
- easy to maintain with a simple semantic html structure, sensibly organised css and intuitive grid layouts:

![v1 11 dev tools](https://github.com/nickabs/transmission/assets/4947488/aa9c2153-ccf9-412d-b08d-50852763c09d)

# Make changes to the theme

For instructions on how to install Ghost, see the [official documentation](https://ghost.org/help/).

You will need [Node](https://nodejs.org/) and [Gulp](https://gulpjs.com) installed globally before making changes to the theme.

to start, unzip the zip file into the theme directory of your local installation.

After that, you then need to install the packages used by the theme.  From the theme's root directory:
```bash
# Install
npm install

# Run build & watch for changes
npm run dev
```
the first command downloads the node packages into transmission/node_modules and the second commands starts up a file watcher that will rebuild the theme assets whenever you change theme source code (see `gulpfile.mjs` for details)

You can use the npm `zip` task to package the theme files into a single zip file named using the theme version number specified in package.json (for instance  `dist/transmission_v1.6.3.zip`):
```bash
npm run zip
```

This zip file can then be used to install the modified theme on your site.

