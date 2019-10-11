const fs = require('fs-extra');
const path = require('path');
const uncss = require('util').promisify(require('uncss'));
const twig = require('twig');
const renderTwigFile = require('util').promisify(twig.renderFile);

(async () => {
    let result = await renderTwigFile(__dirname + '/../src/page/md-page.twig', {content: 'empty', navigationData: []});
    fs.writeFileSync(path.resolve(__dirname, '../dist/', 'md-page.html'), result);

    let result2 = await renderTwigFile(__dirname + '/../src/page/overview.twig', {
        content: 'empty',
        navigationData: []
    });
    fs.writeFileSync(path.resolve(__dirname, '../dist/', 'overview.html'), result2);

    fs.ensureFileSync(path.resolve(__dirname, '../dist/', 'cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.bundle.min.js'));
    fs.ensureFileSync(path.resolve(__dirname, '../dist/', 'cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.10/highlight.min.js'));

    const files = [
        'dist/md-page.html',
        'dist/overview.html',
    ];

    try {
        let output = await uncss(files, {
            htmlroot: 'dist/',
            banner: false,
            inject: function (window) {
                window.data = [];
                window.document.body.appendChild = function () {
                };
            },
            stylesheets: ['style.css'],
            ignore: [
                /.*code.*/,
                /.*pre.*/,
                /.*hljs.*/,
                'table',
                'td',
                'tr',
                'ul',
                'li',
                'a',
                /.*input.*/,
                /.*is-active.*/,
                /.*content.*/,
                /.*progress.*/,
                /\.menu.*/,
                /\.navbar-item.*/,
                'h1',
                '.is-fluid',
                '*.box*',
                /.*file-search.*/,
                /.*nav-menu.*/
            ]
        });

        fs.writeFileSync(path.resolve(__dirname, '..', 'dist/style.min.css'), output);
    } catch (err) {
        console.error(err);
    }
})();

