# G:/dev/01_projects/mdWiki/src/Assets.js
```js
const path = require('path');
const fs = require('fs');
const glob = require('util').promisify(require('glob'));
const logger = require('./common/logger');

const assets = {
    '/robots.txt': fs.readFileSync(path.resolve(__dirname, '../static/', 'robots.txt')),
    '/darkly.min.css': fs.readFileSync(path.resolve(__dirname, '../static/', 'darkly.min.css')),
    '/bulma.min.css': fs.readFileSync(path.resolve(__dirname, '../static/', 'bulma.min.css')),
    '/favicon.ico': fs.readFileSync(path.resolve(__dirname, '../static/', 'favicon.ico')),
    '/highlight.js': fs.readFileSync(path.resolve(__dirname, '../static/', 'highlight.pack.js')),
    '/mousetrap.js': fs.readFileSync(path.resolve(__dirname, '../static/', 'mousetrap.min.js')),
    '/lorempixel.jpg': fs.readFileSync(path.resolve(__dirname, '../static/', 'lorempixel.jpg')),
};

module.exports = (assetUID) => {
    let bundlePath = path.resolve(__dirname, '../client/dist/bundle.min.js');
    if (process.env.DEV === 'true') {
        bundlePath = bundlePath.replace('.min', '');
    }
    assets['/bundle' + assetUID + '.js'] = fs.readFileSync(bundlePath, 'utf8');

    let stylePath = path.resolve(__dirname, '../client/dist/style.min.css');
    if (process.env.DEV === 'true') {
        stylePath = stylePath.replace('.min', '');
    }
    assets['/style' + assetUID + '.css'] = fs.readFileSync(stylePath, 'utf8');

    let injectData = function (bundleText, navigationData) {
        return `(function(serverData, window){window.serverData = serverData;${bundleText}})(${
            JSON.stringify({
                assetUID,
                flatNavigationEntries: navigationData
            })}, window);`;
    }

    return {
        isAsset: function (path) {
            return typeof assets[path] !== 'undefined';
        },
        getAsset: function (path, navigationData) {

            if (path === '/bundle' + assetUID + '.js') {
                return injectData(assets[path], navigationData);
            }

            return assets[path];
        },
        isUserAsset: async function (basePath, path) {
            let staticFiles = await glob(basePath + '**/*.!(md)');
            let filePath = basePath.replace(/\\/g, '/') + path.substr(1);
            logger.debug(filePath, staticFiles.includes(filePath));

            return staticFiles.includes(filePath);
        },
        getUserAsset: function (basePath, path) {
            let filePath = basePath.replace(/\\/g, '/') + path.substr(1);

            return fs.readFileSync(filePath);
        }
    };
};

 ```