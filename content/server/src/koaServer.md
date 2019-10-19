# G:/dev/01_projects/mdWiki/src/koaServer.js
```js
require('dotenv').config();
const Koa = require('koa');
const fs = require('fs');
const path = require('path');
const marked = require('marked');
const compress = require('koa-compress');
const twig = require('twig');
const renderTwigFile = require('util').promisify(twig.renderFile);
const uniqid = require('uniqid');
const assetUID = '.' + uniqid.time();
const mime = require('mime-types')
const glob = require('util').promisify(require('glob'));
const basePath = path.resolve(__dirname + '/../myContent/') + path.sep;
const logger = require('./Logger');
const renderer = require('./markedRenderer').renderer;
const assets = require('./Assets')(assetUID);
const buildIndex = require('./search').buildIndex;

async function contentDataFactory(basePath) {

    let files = await glob(basePath + '/**/*.md');
    let i = 0;
    let contents = files.map((file) => {


        return {
            body: fs.readFileSync(file, 'utf8'),
            title: path.parse(file).name,
            url: '/' + path.resolve(file).replace(basePath, '').split(path.sep).join('/').replace('.md', '.html'),
            id: i++
        };
    });

    return contents;
}


const app = new Koa();
const navDataFactory = new (require('./NavDataFactory'))(basePath);

app.use(compress({
    flush: require('zlib').Z_SYNC_FLUSH
}));

const searchResultTemplatePath = __dirname + '/../client/src/page/search-results.twig';
const searchResultContentTemplatePath = __dirname + '/../client/src/static-content/search-results-content.twig';
const markdownPageTemplatePath = __dirname + '/../client/src/page/markdown-page.twig';
const viewModel = {assetUID};

app.use(async (ctx, next) => {
    ctx.navigationData = await navDataFactory.createNavData();
    viewModel.navigationData = ctx.navigationData;
    await next();
});

if (process.env.DEV === 'true') {
    app.use(async (ctx, next) => {
        if (ctx.request.querystring.includes('content=1')) {
            logger.info('content-request: ' + ctx.path);
        } else {
            logger.info('full-request: ' + ctx.path);
        }

        await next();
    });
}


app.use(async (ctx, next) => {
    if (ctx.path === '/search' && ctx.request.querystring.includes('q=')) {
        logger.debug(ctx.request.query.q);
        let contents = await contentDataFactory(basePath);
        let index = await buildIndex(contents);
        let searchResult = await index.search(ctx.request.query.q);
        searchResult = searchResult.map((result) => {
            let content = contents.find((item) => item.id == result.ref);
            return {
                ...result,
                excerpt: content.body.substr(content.body.indexOf(ctx.request.query.q) - 100, (200 + ctx.request.query.q.length)),
                title: content.title,
                url: content.url
            }
        });
        logger.debug(searchResult);

        ctx.status = 200;
        ctx.type = 'application/json';
        ctx.body = searchResult;
    } else {
        await next();
    }
});

app.use(async (ctx, next) => {
    logger.silly('asset-route');

    if (assets[ctx.path]) {
        logger.verbose('resolve asset: ' + ctx.path);
        ctx.compress = true;
        ctx.set('Cache-Control', 'max-age=' + 365 * 24 * 60 * 60);
        let type = mime.lookup(ctx.path);

        ctx.status = 200;
        ctx.type = type;
        ctx.body = assets[ctx.path](ctx.navigationData);
    } else {
        await next();
    }
});

app.use(async (ctx, next) => {
    logger.silly('user-asset-route');
    const staticFiles = await glob(basePath + '**/*.!(md)');
    let filePath = basePath.replace(/\\/g, '/') + ctx.path.substr(1);
    console.log(filePath, staticFiles.includes(filePath));
    if (staticFiles.includes(filePath)) {
        let type = mime.lookup(filePath);
        if (type) {
            logger.verbose('resolve: user-asset');
            ctx.status = 200;
            ctx.type = type;
            ctx.body = new Buffer(fs.readFileSync(filePath));
        }
    } else {
        await next();
    }
});

app.use(async (ctx, next) => {
    logger.silly('user-page-route');
    let matchingNavEntry = ctx.navigationData.find((item) => item.url === (ctx.path.replace(/\.md$/, '.html')));
    if (typeof matchingNavEntry !== 'undefined') {
        logger.verbose('resolve: user-page-route');
        let pageHtmlContent;
        let pageContent = fs.readFileSync(basePath + (matchingNavEntry.filePath), 'utf8');
        pageHtmlContent = marked(pageContent, {renderer: renderer});

        if (!ctx.request.querystring.includes('content=1')) {
            pageHtmlContent = await renderTwigFile(markdownPageTemplatePath, {
                ...viewModel,
                content: pageHtmlContent
            });
        }


        ctx.status = 200;
        ctx.type = 'text/html';
        ctx.body = pageHtmlContent;
    } else {
        await next();
    }
});


app.use(async (ctx, next) => {
    logger.silly('searchResult');
    if (ctx.path === '/searchResult.html') {
        logger.info(ctx.request.query.q);
        console.dir(ctx.request.query);
        let contents = await contentDataFactory(basePath);
        let index = await buildIndex(contents);
        let searchResults = await index.search(ctx.request.query.q);
        searchResults = searchResults.map((result) => {
            let content = contents.find((item) => item.id == result.ref);
            return {
                ...result,
                excerpt: content.body.substr(content.body.indexOf(ctx.request.query.q) - 100, (200 + ctx.request.query.q.length)),
                title: content.title,
                url: content.url
            }
        });


        logger.info(searchResults);
        logger.verbose('resolve: searchResult.html');
        let pageHtmlContent;
        if (!ctx.request.querystring.includes('content=1')) {
            pageHtmlContent = await renderTwigFile(searchResultTemplatePath, {...viewModel, searchResults});
        } else {
            pageHtmlContent = await renderTwigFile(searchResultContentTemplatePath, {...viewModel, searchResults});
        }

        ctx.status = 200;
        ctx.type = 'text/html';
        ctx.body = pageHtmlContent;
    } else {
        await next();
    }
});


const indexSitemapTemplatePath = __dirname + '/../client/src/page/index-sitemap.twig';
const indexSitemapContentTemplatePath = __dirname + '/../client/src/static-content/index-sitemap-content.twig';

app.use(async (ctx, next) => {
    logger.silly('index');
    if (ctx.path === '/index.html') {
        logger.verbose('resolve: index.html');
        let pageHtmlContent;
        if (!ctx.request.querystring.includes('content=1')) {
            pageHtmlContent = await renderTwigFile(indexSitemapTemplatePath, viewModel);
        } else {
            pageHtmlContent = await renderTwigFile(indexSitemapContentTemplatePath, viewModel);
        }

        ctx.status = 200;
        ctx.type = 'text/html';
        ctx.body = pageHtmlContent;
    } else {
        await next();
    }
});

app.use(async (ctx, next) => {
    await next();
    logger.warn('catch-all');

    ctx.status = 404;
    ctx.type = 'text/html';
    ctx.body = `<html><head><title>Wrong turn!</title></head><body><a href="/index.html">Where am I?</a></body></html>`;
});

app.listen(3001);
logger.info('listening on: http://127.0.0.1:3001/index.html');
 ```