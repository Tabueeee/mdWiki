const sass = require('util').promisify(require('node-sass').render);
const path = require('path');
const fs = require('fs');
const globImporter = require('node-sass-glob-importer');

(async () => {
    try {
        let result = await sass({
            importer: globImporter(),
            file: path.resolve(__dirname, '..', 'src/style.scss'),
        });
        fs.writeFileSync(path.resolve(__dirname, '..', 'dist/style.css'), result.css.toString());
    } catch (err) {
        console.error(err);
    }
})();
