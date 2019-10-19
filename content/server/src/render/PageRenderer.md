# G:/dev/01_projects/mdWiki/src/render/PageRenderer.js
```js
const twig = require('twig');
const renderTwigFile = require('util').promisify(twig.renderFile);
const marked = require('marked');
const renderer = require('./markedRenderer').renderer;

const PageRenderer = function () {
    const renderTwig = (filePath, payload) => {
        return renderTwigFile(filePath, payload);
    }

    const pageRoutes = {
        '/index.html': {
            pageTemplate: renderTwig.bind(null, __dirname + '/../../client/src/page/index-sitemap.twig'),
            contentTemplate: renderTwig.bind(null, __dirname + '/../../client/src/static-content/index-sitemap-content.twig')
        },
        '/searchResult.html': {
            pageTemplate: renderTwig.bind(null, __dirname + '/../../client/src/page/search-results.twig'),
            contentTemplate: renderTwig.bind(null, __dirname + '/../../client/src/static-content/search-results-content.twig')
        },
        'USER_PAGE': {
            pageTemplate: (payload, markdownString) => {
                return renderTwig(__dirname + '/../../client/src/page/markdown-page.twig', {
                    ...payload,
                    content: marked(markdownString, {renderer})
                });
            },
            contentTemplate: (payload, markdownString) => {
                return marked(markdownString, {renderer});
            }
        },
    }

    return {
        renderPage: async function (requestPath, renderLayout, payload, markdownString) {
            let renderer = pageRoutes[requestPath];

            if (renderLayout) {
                return await renderer.pageTemplate(payload, markdownString);
            }

            return await renderer.contentTemplate(payload, markdownString);
        }
    };
}

module.exports = PageRenderer;
 ```