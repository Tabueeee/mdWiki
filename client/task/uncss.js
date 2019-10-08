const fs = require('fs');
const path = require('path');
const uncss = require('util').promisify(require('uncss'));

(async () => {
    const files = [
        'dist/index.html'
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
                /.*nav-search.*/
            ]
        });

        fs.writeFileSync(path.resolve(__dirname, '..', 'dist/style.min.css'), output);
    } catch (err) {
        console.error(err);
    }
})();
