# G:/dev/01_projects/mdWiki/src/main.js
```js
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const logger = require('./common/logger');
const createApp = require('./koaServer').createApp;
const assetUID = '.' + require('uniqid').time();
const assets = require('./Assets')(assetUID);
const pageRenderer = require('./render/PageRenderer')();
const argv = require('yargs').argv;
const basePath = (typeof argv.contentDir === 'string' ? argv.contentDir : path.resolve(__dirname + '/../content/') + path.sep);

const userDataFactory = new (require('./factory/UserDataFactory'))(basePath);

(async () => {
    const app = await createApp(assetUID, userDataFactory);

    // /STATIC_ASSET
    app.use(async (ctx, next) => {
        if (assets.isAsset(ctx.path)) {
            ctx.set('Cache-Control', 'max-age=' + 365 * 24 * 60 * 60);

            ctx.compress = true;
            ctx.setResponse(assets.getAsset(ctx.path, ctx.navigationData));
        } else {
            await next();
        }
    });

    // /USER_ASSET
    app.use(async (ctx, next) => {
        if (await assets.isUserAsset(basePath, ctx.path)) {
            ctx.compress = true;
            ctx.setResponse(await assets.getUserAsset(basePath, ctx.path));
        } else {
            await next();
        }
    });

    // /index.html
    app.use(async (ctx, next) => {
        if (ctx.path === '/index.html') {
            ctx.setResponse(await pageRenderer.renderPage(ctx.path, !ctx.request.querystring.includes('content=1'), ctx.viewModel));
        } else {
            await next();
        }
    });

    // /search
    app.use(async (ctx, next) => {
        if (ctx.path === '/search' && typeof ctx.request.query.q === 'string') {
            let searchResults = await ctx.indexSearch(ctx.request.query.q);
            ctx.setResponse(searchResults, 'application/json');
        } else {
            await next();
        }
    });

    // /searchResult.html
    app.use(async (ctx, next) => {
        if (ctx.path === '/searchResult.html') {
            let searchResults = await ctx.indexSearch(ctx.request.query.q);
            ctx.setResponse(await pageRenderer.renderPage(ctx.path, !ctx.request.querystring.includes('content=1'), {
                ...ctx.viewModel,
                searchResults
            }));
        } else {
            await next();
        }
    });

    // /USER_PAGE
    app.use(async (ctx, next) => {
        let matchingNavEntry = ctx.navigationData.find((item) => item.url === (ctx.path.replace(/\.md$/, '.html')));
        if (typeof matchingNavEntry !== 'undefined') {
            let pageContent = fs.readFileSync(basePath + (matchingNavEntry.filePath), 'utf8');
            ctx.setResponse(await pageRenderer.renderPage(
                'USER_PAGE',
                !ctx.request.querystring.includes('content=1'),
                ctx.viewModel,
                pageContent
            ));
        } else {
            await next();
        }
    });

    // 404 / catchAll
    app.use(async (ctx, next) => {
        await next();
        logger.warn('catch-all: ' + ctx.path);

        ctx.status = 404;
        ctx.type = 'text/html';
        ctx.body = `<html><head><title>Wrong turn!</title></head><body><a href="/index.html">Where am I?</a></body></html>`;
    });

    app.listen(((typeof argv.port === 'number') ? argv.port : 3001));
    logger.info('listening on: http://127.0.0.1:' + ((typeof argv.port === 'number') ? argv.port : 3001) + '/index.html');
})();
 ```