const fs = require('fs');
const posthtml = require('posthtml');
const inline = require('posthtml-inline-assets');
const html = fs.readFileSync('src/index.html');

posthtml([inline()])
    .process(html)
    .then((result) => {
        fs.writeFileSync('./dist/index.html', result.html);
    });
