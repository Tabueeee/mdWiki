const fs = require('fs');
const posthtml = require('posthtml');
const inline = require('posthtml-inline-assets');
const html = fs.readFileSync('src/index.html');

// destination.txt will be created or overwritten by default.
fs.copyFile(__dirname+'/../src/index.html', 'destination.txt', (err) => {
    if (err) throw err;
    console.log('source.txt was copied to destination.txt');
});
// posthtml([inline()])
//     .process(html)
//     .then((result) => {
//         fs.writeFileSync('./dist/index.html', result.html);
//     });
