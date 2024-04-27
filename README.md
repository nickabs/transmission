# Transmission
[features](#features) |
[drop down menu](#drop-down-menu-configuration) |
[demo](#demo) |
[download](#download-and-install) |
[developer information](#for-developers) |
[making changes](#make-changes-to-the-theme)

Transmission is a modern [Ghost](https://ghost.org/) theme.

widescreen, tablet and mobile layouts:

![1 6 3 home views](https://github.com/nickabs/transmission/assets/4947488/78a796b6-c148-4b89-9867-08e90a1072b3)

![1 6 3 page views](https://github.com/nickabs/transmission/assets/4947488/1cfabeb7-40b1-409f-b4db-eedfe4fa5f77)

# Features

- dark mode toggle (dark mode will default to the operating system setting, but can be overridden by the user)
- dropdown menus 
- table of contents for long articles, including a reading progress indicator - works in both mobile and laptop views)
- sharing icons (facebook, twitter, whatsapp, copy link)
- Search
- Tags and authors page
- modern Inter and Menelo font families are installed with the theme
- infinite pagination (will display a button to Load More posts)

# Drop down menu configuration
A two level drop down menu can be created using the standard Ghost naviagion feature (settings > navigation).
When the navigation item name is preceeded by a single dash it will show as a parent item and any item with two dashes immediately following it will show as a child item.  For instance:

<div align="center">
    <img height="250" alt="drop down menu" src="https://github.com/nickabs/transmission/assets/4947488/4cefbbd5-284f-45fe-be4c-5db69f95387f">
    <img height="250" alt="drop down menu demo" src="https://github.com/nickabs/transmission/assets/4947488/86f961d5-c2f4-4b3b-be6e-06930f4c1a5e">
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

![1 6 3 grid layouts](https://github.com/nickabs/transmission/assets/4947488/95f142d7-bfe2-42a7-baea-4e4d9727a3ff)

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

