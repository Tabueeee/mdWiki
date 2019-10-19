const path = require('path');
const FileLoader = require('./FileLoader');
const fileLoader = new FileLoader();

const assets = {
    '/robots.txt': fileLoader.loadFileContent.bind(fileLoader, path.resolve(__dirname, '../static/', 'robots.txt')),
    '/darkly.min.css': fileLoader.loadFileContent.bind(fileLoader, path.resolve(__dirname, '../static/', 'darkly.min.css')),
    '/bulma.min.css': fileLoader.loadFileContent.bind(fileLoader, path.resolve(__dirname, '../static/', 'bulma.min.css')),
    '/favicon.ico': fileLoader.loadFileContent.bind(fileLoader, path.resolve(__dirname, '../static/', 'favicon.ico')),
    '/highlight.js': fileLoader.loadFileContent.bind(fileLoader, path.resolve(__dirname, '../static/', 'highlight.pack.js')),
    '/mousetrap.js': fileLoader.loadFileContent.bind(fileLoader, path.resolve(__dirname, '../static/', 'mousetrap.min.js')),
    '/lorempixel.jpg': fileLoader.loadFileContent.bind(fileLoader, path.resolve(__dirname, '../static/', 'lorempixel.jpg')),
};

module.exports = (assetUID) => {
    let bundlePath = path.resolve(__dirname, '../client/dist/bundle.min.js');
    if (process.env.DEV === 'true') bundlePath = bundlePath.replace('.min', '');
    assets['/bundle' + assetUID + '.js'] = (navigationData) => `(function(serverData, window){window.serverData = serverData;${fileLoader.loadFileContent(bundlePath)}})(${
        JSON.stringify({
            assetUID,
            flatNavigationEntries: navigationData
        })}, window);`;

    let stylePath = path.resolve(__dirname, '../client/dist/style.min.css');
    if (process.env.DEV === 'true') stylePath = stylePath.replace('.min', '');
    assets['/style' + assetUID + '.css'] = fileLoader.loadFileContent.bind(fileLoader, stylePath);

    return assets;
};

