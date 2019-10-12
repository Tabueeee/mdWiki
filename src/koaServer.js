const Koa = require('koa');
const fs = require('fs');
const path = require('path');
const marked = require('marked');
const compress = require('koa-compress');
const twig = require('twig');
const renderTwigFile = require('util').promisify(twig.renderFile);
const basePath = path.resolve(__dirname + '/../content/') + path.sep;
const uniqid = require('uniqid');
const assetUID = '.' + uniqid.time();

if (!process.argv.includes('--v')) {
    console.log = () => undefined;
}

const app = new Koa();
const navDataFactory = new (require('./NavDataFactory'))(basePath);

app.use(compress({
    flush: require('zlib').Z_SYNC_FLUSH
}));

const js = fs.readFileSync(__dirname + '/../client/dist/bundle.min.js', 'utf8');
const style = fs.readFileSync(__dirname + '/../client/dist/style.min.css', 'utf8');
const robots = fs.readFileSync(__dirname + '/../static/robots.txt', 'utf8');
const darkly = fs.readFileSync(__dirname + '/../static/darkly.min.css', 'utf8');
const favicon = fs.readFileSync(__dirname + '/../static/favicon.ico', 'utf8');
const highlight = fs.readFileSync(__dirname + '/../static/highlight.pack.js', 'utf8');
const lorempixel = fs.readFileSync(__dirname + '/../static/lorempixel.jpg');

const assets = {
    '/robots.txt': {type: 'text/plain', body: () => robots},
    '/darkly.min.css': {type: 'text/css', body: () => darkly},
    '/favicon.ico': {type: 'image/x-icon', body: () => favicon},
    '/highlight.js': {type: 'application/javascript', body: () => highlight},
    '/lorempixel.jpg': {type: 'image/jpeg', body: () => new Buffer(lorempixel)},
};

assets['/bundle' + assetUID + '.js'] = {
    type: 'application/javascript',
    body: (navigationData) => '(function(data, window){window.data = data;' + js + '})(' + JSON.stringify(navigationData) + ', window);'
};
assets['/style' + assetUID + '.css'] = {type: 'text/css', body: () => style};

const indexSitemapTemplatePath = __dirname + '/../client/src/page/index-sitemap.twig';
const indexSitemapContentTemplatePath = __dirname + '/../client/src/static-content/index-sitemap-content.twig';
const markdownPageTemplatePath = __dirname + '/../client/src/page/markdown-page.twig';
const viewModel = {assetUID};

app.use(async ctx => {
    let navigationData = await navDataFactory.createNavData();
    viewModel.navigationData = navigationData;

    ctx.compress = true;

    if (assets[ctx.path]) {
        let {type, body} = assets[ctx.path];
        ctx.set('Cache-Control', 'max-age=' + 365 * 24 * 60 * 60);
        ctx.type = type;
        ctx.body = body(navigationData);

        return;
    }

    console.log([ctx.path, ctx.request.querystring.includes('content=1')]);

    let matchingNavEntry = navigationData.find((item) => item.url === (ctx.path));
    let pageHtmlContent;

    if (typeof matchingNavEntry !== 'undefined') {
        let pageContent = fs.readFileSync(basePath + (matchingNavEntry.filePath), 'utf8');
        pageHtmlContent = marked(pageContent);

        if (!ctx.request.querystring.includes('content=1')) {
            pageHtmlContent = await renderTwigFile(markdownPageTemplatePath, {...viewModel, content: pageHtmlContent});
        }
    } else {
        if (!ctx.request.querystring.includes('content=1')) {
            pageHtmlContent = await renderTwigFile(indexSitemapTemplatePath, viewModel);
        } else {
            pageHtmlContent = await renderTwigFile(indexSitemapContentTemplatePath, viewModel);
        }
    }

    ctx.type = 'text/html';
    ctx.body = pageHtmlContent;
});

app.listen(3001);
console.log('listening on: http://127.0.0.1:3001/index.html');
