import {series, parallel, watch, src, dest}  from 'gulp';
import pump from 'pump';

/* plugins and utils */
import livereload from 'gulp-livereload';
import postcss from 'gulp-postcss'; // gulp plugin to pipe CSS through several plugins, but parse CSS only once.
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import zip from 'gulp-zip';
import beeper from 'beeper';
import easyimport from 'postcss-easy-import'; // enable @import in css files
import autoprefixer from 'autoprefixer'; // automatically add vendor prefixes to css properties
import cssnano from 'cssnano'; // minifier

function serve(done) {
    livereload.listen();
    done();
}

function handleError(done) {
    return function (err) {
        if (err) {
            beeper();
        }
        return done(err);
    };
};

function hbs(done) {
    pump([
        src(['*.hbs', 'partials/**/*.hbs']),
        livereload()
    ], handleError(done));
}

function css(done) {
    pump([
        src([
            'node_modules/prismjs/themes/prism-tomorrow.css',
            'node_modules/prismjs/plugins/command-line/prism-command-line.min.css',
            'node_modules/tocbot/dist/tocbot.css',
            'node_modules/photoswipe/dist/photoswipe.css',
            'assets/css/import-all.css'
        ], {sourcemaps: true}),
        postcss([
            easyimport,
            cssnano,
            autoprefixer(),
        ]),
        concat('all.css'),
        dest('assets/built/', {sourcemaps: '.'}),
        livereload()
    ], handleError(done));
}

function js(done) {
    // es modules
    pump(
        src([ 
            'node_modules/photoswipe/dist/photoswipe-lightbox.esm.min.js',
            'node_modules/photoswipe/dist/photoswipe.esm.min.js'
        ]),
        uglify(),
        dest('assets/built/'),
        livereload(),
        handleError(done)
    );

    // vendor js
    pump([
        src([
            'node_modules/tocbot/dist/tocbot.js',
            'node_modules/reframe.js/dist/reframe.js',
            'node_modules/prismjs/prism.js',
            'node_modules/prismjs/components/prism-nginx.js',
            'node_modules/prismjs/components/prism-json.js',
            'node_modules/prismjs/components/prism-systemd.js',
            'node_modules/prismjs/components/prism-bash.js',
            'node_modules/prismjs/plugins/command-line/prism-command-line.js'
        ], {sourcemaps: true}),
        concat('vendor.min.js'),
        dest('assets/built/', {sourcemaps: '.'}),
        livereload() ],
        handleError(done)
    );
    //theme js
    pump([
        src([
            'assets/js/dropdown-menu.js',
            'assets/js/pagination.js',
            'assets/js/responsive-video.js',
            'assets/js/copy-link.js',
            'assets/js/dark-mode-toggle.js',
            'assets/js/table-of-contents.js',
            'assets/js/lightbox.js'
        ], {sourcemaps: true}),
        concat('theme.min.js'),
        dest('assets/built/', {sourcemaps: '.'}),
        livereload() ],
        handleError(done)
    );
}

function zipper(done) {
    const filename = require('./package.json').name + '.zip';

    pump([
        src([
            '**',
            '!node_modules', '!node_modules/**',
            '!dist', '!dist/**',
            '!yarn-error.log',
            '!yarn.lock'
        ]),
        zip(filename),
        dest('dist/')
    ], handleError(done));
}

// watch ghost theme files
const hbsWatcher = () => watch(['*.hbs', 'partials/**/*.hbs'], hbs);
const cssWatcher = () => watch('assets/css/**/*.css', css);
const jsWatcher = () => watch('assets/js/**/*.js', js);
const watcher = parallel(hbsWatcher, cssWatcher, jsWatcher);
const build = series(css, js);

/*
 * The function below are exported so they are public and can be run with the `gulp` command.
 * they can also be used within the `series()` composition.
 */
exports.build = build;
exports.zip = series(build, zipper);
exports.default = series(build, serve, watcher);
