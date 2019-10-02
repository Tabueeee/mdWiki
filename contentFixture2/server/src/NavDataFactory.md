# G:/dev/01_projects/mdWiki/src/NavDataFactory.js
```js
const glob = require('util').promisify(require('glob'));
const path = require('path');

var NavDataFactory = function (basePath) {
    var createNavData = async function(){
        let files = await glob(__dirname + '/../contentFixture2/**/*.md');

        let navItems = [];

        for (let file of files) {
            file = path.resolve(file);
            file = file.replace(basePath, '');

            let [category1, category2, ...restCategories] = file.split('\\');

            if (restCategories.length === 0 && typeof category2 === 'string') {
                restCategories = [category2];
                category2 = 'Loose';
            }

            if (typeof category2 !== 'string') {
                restCategories = [category1];
                category2 = 'Loose';
                category1 = 'Loose';
            }

            let item = {
                category: category1,
                subcategory: (category2 || ''),
                topic: restCategories.join('.').replace('.md', ''),
                filePath: file,
                url: '/' + file.replace(/\\/g, '/').replace('.md', '.html')
            };
            navItems.push(item);
        }

        return navItems;
    };

    return {
        'createNavData': createNavData
    };
};

module.exports = NavDataFactory;
 ```