const glob = require('util').promisify(require('glob'));
// const path = require('path');
const fs = require('fs-extra');

(async () => {
    fs.emptyDirSync(__dirname + '/content/client/');
    fs.emptyDirSync(__dirname + '/content/server/');

    let files = await glob(__dirname + '/client/src/**/*.+(js|html|scss|ts|twig)');

    for (let file of files) {
        await writeFileFixture(file, 'client/', 'content/client/');
    }

    let serverFiles = await glob(__dirname + '/src/*');

    for (let file of serverFiles) {
        await writeFileFixture(file, 'src/', 'content/server/src/');
    }
})();


async function writeFileFixture(filePath, replace, targetPath) {
    let content = fs.readFileSync(filePath, 'utf8');

    content = '# ' + filePath + '\n```js\n' + content + ' ```';

    let path = filePath.substr(0, filePath.lastIndexOf('.'));
    path = path + '.md';
    path = path.replace(replace, targetPath);

    console.log('write to: ' + path);
    await fs.ensureFile(path);
    fs.writeFileSync(path, content);
}
