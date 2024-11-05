# Transmission
[features](#features) |
[drop down navigation](#drop-down-navigation-configuration) |
[demo](#demo) |
[download](#download-and-install) |
[developer information](#for-developers) |
[making changes](#make-changes-to-the-theme)

Transmission is a modern [Ghost](https://ghost.org/) theme.

widescreen, tablet and mobile layouts:
![transmission v1 23 home](https://github.com/user-attachments/assets/01b687ec-c118-4414-92f9-d11b4aae3aee)
![transmission v1 23 post](https://github.com/user-attachments/assets/5cfd6ed9-9d76-4145-a887-c3239855c333)

# Features
This theme is optimised for traditional blog sites, particularly sites with lots of content and long articles. Features include:

- dark mode toggle (dark mode will default to the operating system setting, but can be overridden by the user)
- dropdown navigation menu: expanded or minimised (hamburger) options
- table of contents for long articles, including a reading progress indicator - works in both mobile and laptop views)
- sharing icons (facebook, twitter, whatsapp, copy link)
- Search
- Tags and authors page
- modern Inter, Roboto and Menelo font families are installed with the theme
- infinite pagination (will display a button to Load More posts)
- configurable layouts: home page, post layout, headers and footers are all configurable
  
# Pagespeed scores

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

[See the theme demo site](https://demo.transmissionthemes.com).

# Download and Install
You can download the latest version from the demo site (above) or get previous versions from the [Releases](https://github.com/nickabs/transmission/releases) page.
The theme is installed by using the Ghost theme admin tools on your site to upload the transmission.zip file.

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
# Release a new version of the theme
the ```release``` javascript util can be used to create new github releases from the command line.

To do a quick release of all the latest changes:

```bash
# increment version in package.json and bump the vesion"
git commit -am "bump version"
git push origin main
npm run full-release
```
the full-release npm script does the following:
1. gscan the theme
2. creates a changelog based on github commits since the previous release
3. creates the  dist/theme.zip
4. creates a github release with a tag of package.json
5. uploads the theme.zip file to the relase

if you prefer you can run each of these stages separately using the appropriate npm scripts
