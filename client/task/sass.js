const sass = require('util').promisify(require('node-sass').render);
const path = require('path');
const fs = require('fs');
const globImporter = require('node-sass-glob-importer');

[
    path.resolve(__dirname, '../src/critical.scss'),
    path.resolve(__dirname, '../src/style.scss')
].forEach(async (filePath) => {
    let result = await sass({
        importer: globImporter(),
        file: filePath,
    });
    let outputPath = path.resolve(__dirname, '../dist/', (path.basename(filePath)).replace('.scss', '.css'));

    fs.writeFileSync(outputPath, result.css.toString());
    console.log('created: ' + outputPath);
});
