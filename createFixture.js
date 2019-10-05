const glob = require('util').promisify(require('glob'));
// const path = require('path');
const fs = require('fs');

(async () => {

    let files = await glob(__dirname + '/client/src/**/*.+(js|html|scss)');

    for (let file of files) {
        writeFileFixture(file, 'client/', 'content/client/');
    }

    let serverFiles = await glob(__dirname + '/src/*');

    for (let file of serverFiles) {
        writeFileFixture(file, 'src/', 'content/server/src/');
    }
})();


function writeFileFixture(filePath, replace, targetPath) {
    let content = fs.readFileSync(filePath, 'utf8');

    content = '# ' + filePath + '\n```js\n' + content + ' ```';

    let path = filePath.substr(0, filePath.lastIndexOf('.'));
    path = path + '.md';
    path = path.replace(replace, targetPath);

    console.log('write to: ' + path);
    fs.writeFileSync(path, content);
}
