# Transmission
Transmission is a modern [Ghost](https://ghost.org/) theme.

widescreen, tablet and mobile layouts:

![1 6 3 home views](https://github.com/nickabs/transmission/assets/4947488/78a796b6-c148-4b89-9867-08e90a1072b3)

![1 6 3 page views](https://github.com/nickabs/transmission/assets/4947488/1cfabeb7-40b1-409f-b4db-eedfe4fa5f77)

## Features
- responsive layouts for mobile, tablet, laptops and desktop screens
    - dark mode toggle
    - dropdown menus for topics
    - table of contents for long articles (includes a reading progress indicator - works in both mobile and laptop views)
    - sharing icons (facebook, twitter, copy link)
    - Search
    - Tags and author page

- minimal dependencies
    - image gallery (photowsipe)
    - code syntax highlighting (prism)
    - responsive table of content (tocbot)
- Inter and Menelo font families are installed with the theme
- 

easy to maintain with simple html & css and intuitive grid layouts:

![1 6 3 grid layouts](https://github.com/nickabs/transmission/assets/4947488/95f142d7-bfe2-42a7-baea-4e4d9727a3ff)

## Demo

[See the theme in action](https://smallworkshop.co.uk).

## Download and Install

[Download `transmission.zip` from the Releases page](https://github.com/nickabs/transmission/releases)

## Make changes to the theme

For instructions on how to install Ghost, see the [official documentation](https://ghost.org/help/).

You will need [Node](https://nodejs.org/) and [Gulp](https://gulpjs.com) installed globally. 

unzip the zip file into the theme directory of your local install.

After that, from the theme's root directory:
```bash
# Install
npm install

# Run build & watch for changes
npm run dev
```
the first command downloads the packages used by the theme into transmission/node_modules and the second starts up a file watcher that will rebuild the theme assets whenever you change theme source code (see `gulpfile.mjs` for details)

The `zip` npm task packages the theme files into a single zip file named using the theme version number specified in package.json, for instance  `dist/transmission_v1.6.3.zip`. This zip file can then be used to install the modified theme on your site.

```bash
npm run zip
```

