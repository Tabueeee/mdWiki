# G:/dev/01_projects/mdWiki/src/koaServer.js
```js
const Koa = require('koa');
const compress = require('koa-compress');
const mime = require('mime-types');
const buildIndex = require('./search').buildIndex;

module.exports = {
    createApp: async (assetUID, userDataFactory) => {
        let app = new Koa();

        app.context.contentData = await userDataFactory.getContentData();
        app.context.navigationData = await userDataFactory.createNavData();
        app.context.index = await buildIndex(app.context.contentData);
        app.context.viewModel = {assetUID, navigationData: app.context.navigationData};

        app.use(compress({
            flush: require('zlib').Z_SYNC_FLUSH
        }));

        app.context.setResponse = function (body, mimeType) {
            this.status = 200;
            this.type = mimeType || mime.lookup(this.path) || 'text/plain';
            this.body = body;
        }

        app.context.indexSearch = async function (queryString) {
            // live update
            app.context.contentData = await userDataFactory.getContentData();
            app.context.index = await buildIndex(app.context.contentData);

            let searchResults = await app.context.index.search(queryString);
            searchResults = searchResults.map((result) => {
                let content = app.context.contentData.find((item) => item.id === parseInt(result.ref, 10));

                return {
                    ...result,
                    excerpt: content.body.substr(content.body.indexOf(queryString) - 100, (200 + queryString.length)),
                    title: content.title,
                    url: content.url
                }
            });

            return searchResults;
        };

        app.use(async (ctx, next) => {
            // live update
            ctx.navigationData = await userDataFactory.createNavData();
            ctx.viewModel.navigationData = ctx.navigationData;

            await next();
        });

        return app;
    }
}
 ```