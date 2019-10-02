const path = require('path');
const fs = require('fs');
const CleanCSS = require('clean-css');
const css = fs.readFileSync(path.resolve(__dirname, '..', 'src/style.css'), 'utf8');
var options = { };
var output = new CleanCSS(options).minify(css);
console.log(path.resolve(__dirname, '..', 'dist/style.css'));
fs.writeFileSync(path.resolve(__dirname, '..', 'dist/style.css'), output.styles);
