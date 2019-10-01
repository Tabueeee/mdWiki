const Koa = require('koa');
const fs = require('fs');
const path = require('path');
const marked = require('marked');

const basePath = path.resolve(__dirname + '/../contentFixture2/') + '\\';

const app = new Koa();
const navDataFactory = new (require('./NavDataFactory'))(basePath);
const htmlRenderer = new (require('./HtmlRenderer'))();

app.use(async ctx => {
    let navigationData = await navDataFactory.createNavData();

    if (ctx.path === '/bundle.js') {
        ctx.type = 'application/javascript';
        // hot loading for dev only
        ctx.body = '(function(data, window){console.log(data);window.data = data;' + fs.readFileSync(__dirname + '/../client/dist/bundle.js', 'utf8') + '})(' + JSON.stringify(navigationData) + ', window);';

        return;
    } else if (ctx.path === '/style.css') {
        ctx.type = 'text/css';

        ctx.body = fs.readFileSync(__dirname + '/../client/build/style.css', 'utf8');

        return;
    }

    console.log(ctx.path);

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
        let htmlContent = fs.readFileSync(__dirname + '/../client/dist/index.html', 'utf8');
        ctx.type = 'text/html';
        ctx.body = htmlRenderer.renderContent(htmlContent, htmlRenderer.renderPageNav('{{nav}}', navigationData));
    }
});

app.listen(3001);
