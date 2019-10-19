const path = require('path');
const fs = require('fs');
const CleanCSS = require('clean-css');

[
    path.resolve(__dirname, '../dist/critical.un.css'),
    path.resolve(__dirname, '../dist/style.un.css')
].forEach((filePath) => {
    let css = fs.readFileSync(filePath, 'utf8');
    let options = {};

    let output = new CleanCSS(options).minify(css);
    let outputPath = path.resolve(__dirname, '../dist/', (path.basename(filePath)).replace('.un.css', '.min.css'));

    fs.writeFileSync(outputPath, output.styles);
    console.log('created: ' + outputPath);
});
