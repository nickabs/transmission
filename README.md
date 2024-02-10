# transmission
Transmission is a modern [Ghost](https://ghost.org/) theme.

## Features
This theme is designed for a simple single author blog site.  

Features:

- responsive layouts for mobile, tablet, laptops and desktop screens
    - Search
    - Tags page
    - dark mode toggle
    - dropdown menus for topics
    - table of contents for long articles
    - sharing icons (facebook, twitter, copy link)

- minimal dependencies
    - image gallery (photowsipe v5.4)
    - code syntax highlighting (prism)
    - responsive table of content (tocbot)
- Inter and Menelo font families are installed with the theme
- simple html & css, minimal js

There are minimal configuration options in v1.

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
the first command downloads the packages used by the theme into transmission/node_modules.  

The `zip` npm task packages the theme files into `dist/transmission_v1.0.0.zip`, which you can then upload to your site.

```bash
npm run zip
```


widescreen view:
![image](https://github.com/nickabs/transmission/assets/4947488/c33b984c-4663-4eee-9d4d-d9335104b8b1)

mobile:
![image](https://github.com/nickabs/transmission/assets/4947488/0c1061ee-47e2-47ed-aded-222697d08233)

easy to manage grid layout:
![image](https://github.com/nickabs/transmission/assets/4947488/7f59ef4c-023e-45dc-aadf-8ee9e7a687b7)


