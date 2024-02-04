import gulp from 'gulp';
const {series, watch, src, dest, parallel, task} = gulp;

import pump from 'pump';
import livereload from 'gulp-livereload';
import postcss from 'gulp-postcss';
import easyimport from 'postcss-easy-import';
import zip from 'gulp-zip';
import concat from 'gulp-concat';

// esm import
//import pkg from './package.json' with { "type": "json" };
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pkg = require("./package.json");

function serve(done) {
    livereload.listen();
    done();
}

function handleError(done) {
    return function (err) {
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
        ]),
        postcss([
            easyimport
        ]),
        concat('site.css'),
        dest('assets/built/'),
        livereload()
    ], handleError(done));
}

function js(done) {

    //external esm packages
    pump(
        src([
            'node_modules/photoswipe/dist/photoswipe-lightbox.esm.js',
            'node_modules/photoswipe/dist/photoswipe.esm.js'
        ]),
        dest('assets/built/'),
        livereload(),
        handleError(done)
    );

    // external packages
    pump([
        src([
            'node_modules/tocbot/dist/tocbot.js',
            'node_modules/prismjs/prism.js',
            'node_modules/prismjs/components/prism-nginx.js',
            'node_modules/prismjs/components/prism-bash.js',
            'node_modules/prismjs/plugins/command-line/prism-command-line.js'
        ]),
        concat('external.js'),
        dest('assets/built/'),
        livereload() ],
        handleError(done)
    );
    //theme js
    pump([
        src([
            'assets/js/dark-mode-toggle.js',
            'assets/js/dropdown-menu.js',
            'assets/js/pagination.js',
            'assets/js/copy-link.js',
            'assets/js/table-of-contents.js',
            'assets/js/lightbox.js'
        ]),
        concat('theme.js'),
        dest('assets/built/'),
        livereload() ],
        handleError(done)
    );
}

function zipper(done) {
    const filename = pkg.name+'_v'+pkg.version+'.zip';

    pump([
        src([
            '**',
            '!node_modules', '!node_modules/**',
            '!dist', '!dist/**',
            '!package-lock.json'
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

task('dev', series(build, serve, watcher) );
task('dist', series(build, zipper) );

