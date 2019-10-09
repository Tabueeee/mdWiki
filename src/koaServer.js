const Koa = require('koa');
const fs = require('fs');
const path = require('path');
const marked = require('marked');
const compress = require('koa-compress');
const twig = require('twig');
const renderTwigFile = require('util').promisify(twig.renderFile);
const basePath = path.resolve(__dirname + '/../content/') + path.sep;

const app = new Koa();
const navDataFactory = new (require('./NavDataFactory'))(basePath);

app.use(compress({
    flush: require('zlib').Z_SYNC_FLUSH
}));

const js = fs.readFileSync(__dirname + '/../client/dist/bundle.min.js', 'utf8');
const style = fs.readFileSync(__dirname + '/../client/dist/style.min.css', 'utf8');
const robots = fs.readFileSync(__dirname + '/../static/robots.txt', 'utf8');
const favicon = fs.readFileSync(__dirname + '/../static/favicon.ico', 'utf8');
const lorempixel = fs.readFileSync(__dirname + '/../static/lorempixel.jpg');

const assets = {
    '/robots.txt': {type: 'text/plain', body: () => robots},
    '/style.css': {type: 'text/css', body: () => style},
    '/bundle.js': {
        type: 'application/javascript',
        body: (navigationData) => '(function(data, window){window.data = data;' + js + '})(' + JSON.stringify(navigationData) + ', window);'
    },
    '/favicon.ico': {type: 'image/x-icon', body: () => favicon},
    '/lorempixel.jpg': {type: 'image/jpeg', body: () => new Buffer(lorempixel)},
};

const overViewTemplatePath = __dirname + '/../client/src/page/overview.twig';
const overViewContentTemplatePath = __dirname + '/../client/src/static-content/overview-content.twig';
const mdPageTemplatePath = __dirname + '/../client/src/page/md-page.twig';

app.use(async ctx => {
    let navigationData = await navDataFactory.createNavData();
    ctx.compress = true;

    if (assets[ctx.path]) {
        let {type, body} = assets[ctx.path];
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
            pageHtmlContent = await renderTwigFile(mdPageTemplatePath, {navigationData, content: pageHtmlContent});
        }
    } else {
        if (!ctx.request.querystring.includes('content=1')) {
            pageHtmlContent = await renderTwigFile(overViewTemplatePath, {navigationData});
        } else {
            pageHtmlContent = await renderTwigFile(overViewContentTemplatePath, {navigationData});
        }
    }

    ctx.type = 'text/html';
    ctx.body = pageHtmlContent;
});

app.listen(3001);
console.log('listening on: http://127.0.0.1:3001/index.html');
