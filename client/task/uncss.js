const fs = require('fs-extra');
const path = require('path');
const uncss = require('util').promisify(require('uncss'));
const twig = require('twig');
const renderTwigFile = require('util').promisify(twig.renderFile);

const ignoresPatterns = [
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
    /.*nav-menu.*/,
    /.*message.*/,
    /.*is-danger.*/,
    /.*table.*/,
    /.*is-bordered.*/,
    /.*is-striped.*/,
    /.*message-body.*/,
    /.*search-results.*/
];

process.window = {serverData: {assetUID: ''}};

[
    path.resolve(__dirname, '../dist/critical.css'),
    path.resolve(__dirname, '../dist/style.css')
].forEach(async (filePath) => {

    let htmlFiles = await renderTwigFiles([
        path.resolve(__dirname, '../src/page/index-sitemap.twig'),
        path.resolve(__dirname, '../src/page/markdown-page.twig'),
        path.resolve(__dirname, '../src/page/search-results.twig')
    ]);

    fs.ensureFileSync(path.resolve(__dirname, '../dist/', 'cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.bundle.min.js'));
    fs.ensureFileSync(path.resolve(__dirname, '../dist/', 'cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.10/highlight.min.js'));

    let output = await uncss(htmlFiles, {
        htmlroot: 'dist/',
        banner: false,
        inject: function (window) {
            window.serverData = {assetUID: ''};
            window.serverData.flatNavigationEntries = [];
            window.document.body.appendChild = function () {
            };
        },
        stylesheets: ['style.css', 'critical.css'],
        ignore: ignoresPatterns
    });

    let outputPath = path.resolve(__dirname, '../dist/', (path.basename(filePath)).replace('.css', '.un.css'));
    fs.writeFileSync(outputPath, output);
    console.log('created: ' + outputPath);
});


async function renderTwigFiles(twigFilePaths) {
    let staticViewModel = {
        content: 'empty',
        navigationData: [{url: '', filePath: ''}],
        searchResults: [{title: '', excerpt: '', url: ''}]
    };
    let htmlFiles = [];
    for (let twigFilePath of twigFilePaths) {
        let result = await renderTwigFile(twigFilePath, staticViewModel);
        let outputPath = path.resolve(__dirname, '../dist/', (path.basename(twigFilePath)).replace('.twig', '.html'));
        htmlFiles.push('dist/' + path.basename(outputPath));
        fs.writeFileSync(outputPath, result);
    }

    return htmlFiles;
}
