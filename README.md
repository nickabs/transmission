# Transmission

Transmission is a modern [Ghost](https://ghost.org/) theme.

widescreen, tablet and mobile layouts:
<div align="center">
    <img height="300" alt="home views" src="https://github.com/nickabs/transmission/assets/4947488/78a796b6-c148-4b89-9867-08e90a1072b3">
    <img height="300" alt="page views" src="https://github.com/nickabs/transmission/assets/4947488/1cfabeb7-40b1-409f-b4db-eedfe4fa5f77">
</div>

# Features

- different layouts to suit mobile, tablet, laptop and desktop screens
    - dark mode toggle (dark mode will automatically apply when this is the operating system default, but can be overridden by the user)
    - dropdown menus (these are configured using the standard Ghost topics features)
    - table of contents for long articles (includes a reading progress indicator - works in both mobile and laptop views)
    - sharing icons (facebook, twitter, copy link)
    - Search
    - Tags and author page
- modern Inter and Menelo font families are installed with the theme

# drop down menu
A two level drop down menu can be configured using the Ghost naviagion feature (settings > navigation).
When the navigation item name is preceeded by a single dash it will show as a parent item and any item with two dashes immediately following it will show as a child item.  For instance:


<div style="display: flex; justify-content: center;">
    <img height="300" alt="drop down menu" src="https://github.com/nickabs/transmission/assets/4947488/4cefbbd5-284f-45fe-be4c-5db69f95387f">
    <img height="300" alt="drop down menu demo" src="https://github.com/nickabs/transmission/assets/4947488/86f961d5-c2f4-4b3b-be6e-06930f4c1a5e">
  </div>


# Demo

[See the theme in action](https://smallworkshop.co.uk).

# Download and Install

[Download `transmission.zip` from the Releases page](https://github.com/nickabs/transmission/releases)


# for developers

- minimal dependencies
    - image gallery (photowsipe)
    - code syntax highlighting (prism)
    - table of content (tocbot)
- easy to maintain with simple html & css and intuitive grid layouts:

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

