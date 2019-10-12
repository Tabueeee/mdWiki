const glob = require('util').promisify(require('glob'));
// const path = require('path');
const fs = require('fs-extra');


const typeMap = {
    ts: 'typescript',
    js: 'js',
    html: 'html',
    twig: 'twig',
    scss: 'scss',
    css: 'css'
};

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

    let type = filePath.substr(filePath.lastIndexOf('.') + 1);
    content = '# ' + filePath + '\n```' + typeMap[type] + '\n' + content + ' ```';

    let path = filePath.substr(0, filePath.lastIndexOf('.'));
    path = path + '.md';
    path = path.replace(replace, targetPath);

    console.log('write to: ' + path);
    await fs.ensureFile(path);
    fs.writeFileSync(path, content);
}
