# G:/dev/01_projects/mdWiki/src/koaServer.js
```js
const Koa = require('koa');
const fs = require('fs');
const path = require('path');
const marked = require('marked');
const compress = require('koa-compress');

const basePath = path.resolve(__dirname + '/../content/') + '\\';

const app = new Koa();
const navDataFactory = new (require('./NavDataFactory'))(basePath);
const htmlRenderer = new (require('./HtmlRenderer'))();

app.use(compress({
    flush: require('zlib').Z_SYNC_FLUSH
}));

const js = fs.readFileSync(__dirname + '/../client/dist/bundle.js', 'utf8');
const style = fs.readFileSync(__dirname + '/../client/dist/style.css', 'utf8');
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
    '/favicon.ico': {type: 'text/plain', body: () => favicon},
    '/lorempixel.jpg': {type: 'text/plain', body: () => new Buffer(lorempixel)},
};
const htmlBaseTemplate = fs.readFileSync(__dirname + '/../client/dist/index.html', 'utf8');

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
    } else {
        pageHtmlContent = htmlRenderer.renderPageNav('{{nav}}', navigationData);
    }

    if (!ctx.request.querystring.includes('content=1')) {
        pageHtmlContent = htmlRenderer.renderContent(htmlRenderer.renderPageNav(htmlBaseTemplate, navigationData), pageHtmlContent);
    }

    ctx.type = 'text/html';
    ctx.body = pageHtmlContent;
});

app.listen(3001);
 ```