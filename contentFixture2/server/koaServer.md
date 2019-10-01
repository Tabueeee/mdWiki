# G:/app/wiki2/koaServer.js
```js
const Koa = require('koa');
const app = new Koa();
const glob = require('util').promisify(require('glob'));
const path = require('path');
const fs = require('fs');
const basePath = 'G:\\app\\wiki2\\contentFixture2\\';
const marked = require('marked');

const getNavData = async () => {

    let files = await glob(__dirname + '/contentFixture2/**/*.md');

    let navItems = [];

    for (let file of files) {
        file = path.resolve(file);
        file = file.replace(basePath, '');

        let [category1, category2, ...restCategories] = file.split('\\');

        if (restCategories.length === 0 && typeof category2 === 'string') {
            restCategories = [category2];
            category2 = '';
        }

        if (typeof category2 !== 'string') {
            restCategories = [category1];
            category2 = '';
            category1 = 'Loose';
        }

        let item = {
            category: category1,
            subcategory: (category2 || ''),
            topic: restCategories.join('.').replace('.md', ''),
            filePath: file.replace(/\\/g, '/'),
            url: '/' + file.replace(/\\/g, '/').replace('.md', '.html')
        };
        navItems.push(item);
    }

    return navItems;
}


// response
app.use(async ctx => {
    let data = await getNavData();

    if (ctx.path === '/bundle.js') {
        ctx.type = 'application/javascript';
        // hot loading for dev only
        ctx.body = '(function(data, window){console.log(data);window.data = data;' + fs.readFileSync(__dirname + '/client/dist/bundle.js', 'utf8') + '})(' + JSON.stringify(data) + ', window);';

        return;
    }
    console.log(ctx.path);
    console.log(data[0]);
    console.log(ctx.request.querystring.includes('content=1'));

    let item = data.find((item) => item.url === (ctx.path));
    if (typeof item !== 'undefined') {
        let pageContent = fs.readFileSync(basePath + (item.filePath.replace(/\//g, '\\')), 'utf8');
        let pageHtmlContent = marked(pageContent);

        if (ctx.request.querystring.includes('content=1')) {
            ctx.type = 'text/html';
            ctx.body = pageHtmlContent;

        } else {
            ctx.type = 'text/html';
            let htmlContent = fs.readFileSync(__dirname + '/client/dist/index.html', 'utf8');
            let pageHtmlContent = marked(pageContent);
            ctx.body = htmlContent.replace('{{content}}', pageHtmlContent);
        }


    } else {
        ctx.body = 'NANANANANANANANA NOT FOUND';
    }
});

app.listen(3000);
 ```
