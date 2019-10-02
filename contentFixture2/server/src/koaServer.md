# G:/dev/01_projects/mdWiki/src/koaServer.js
```js
const Koa = require('koa');
const fs = require('fs');
const path = require('path');
const marked = require('marked');
const compress = require('koa-compress');


const basePath = path.resolve(__dirname + '/../contentFixture2/') + '\\';

const app = new Koa();
const navDataFactory = new (require('./NavDataFactory'))(basePath);
const htmlRenderer = new (require('./HtmlRenderer'))();

app.use(compress({
    flush: require('zlib').Z_SYNC_FLUSH
}))

app.use(async ctx => {
    let navigationData = await navDataFactory.createNavData();
    ctx.compress = true;

    if (ctx.path === '/bundle.js') {
        ctx.type = 'application/javascript';
        // hot loading for dev only
        ctx.body = '(function(data, window){window.data = data;' + fs.readFileSync(__dirname + '/../client/dist/bundle.min.js', 'utf8') + '})(' + JSON.stringify(navigationData) + ', window);';

        return;
    } else if (ctx.path === '/style.css') {
        ctx.type = 'text/css';
        ctx.body = fs.readFileSync(__dirname + '/../client/build/style.css', 'utf8');

        return;
    } else if (ctx.path === '/robots.txt') {
        ctx.body = fs.readFileSync(__dirname + '/../client/dist/robots.txt', 'utf8');

        return;
    } else if (ctx.path === '/favicon.ico') {
    }else {
        console.log([ctx.path, ctx.request.querystring.includes('content=1')]);
    }


    let matchingNavEntry = navigationData.find((item) => item.url === (ctx.path));
    if (typeof matchingNavEntry !== 'undefined') {
        let pageContent = fs.readFileSync(basePath + (matchingNavEntry.filePath), 'utf8');
        let pageHtmlContent = marked(pageContent);

        if (ctx.request.querystring.includes('content=1')) {
            ctx.type = 'text/html';
            ctx.body = pageHtmlContent;
        } else {
            let htmlContent = fs.readFileSync(__dirname + '/../client/src/index.html', 'utf8');
            let pageHtmlContent = marked(pageContent);
            ctx.type = 'text/html';
            ctx.body = htmlRenderer.renderContent(htmlRenderer.renderPageNav(htmlContent, navigationData), pageHtmlContent);
        }
    } else {
        let htmlContent;
        if (ctx.request.querystring.includes('content=1')) {
            htmlContent = '{{content}}';
        } else {
            htmlContent = fs.readFileSync(__dirname + '/../client/src/index.html', 'utf8');
        }
        ctx.type = 'text/html';
        ctx.body = htmlRenderer.renderContent(htmlContent, htmlRenderer.renderPageNav('{{nav}}', navigationData));
    }
});

app.listen(3001);
 ```