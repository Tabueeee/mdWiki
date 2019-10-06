const sass = require('util').promisify(require('node-sass').render);
const path = require('path');
const fs = require('fs');

(async () => {
    try {
        let result = await sass({
            file: path.resolve(__dirname, '..', 'src/style.scss'),
        });
        fs.writeFileSync(path.resolve(__dirname, '..', 'src/style.css'), result.css.toString());
    } catch (err) {
        console.error(err);
    }
})();
