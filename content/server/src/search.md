# G:/dev/01_projects/mdWiki/src/search.js
```js
const lunr = require('lunr');
let index;

module.exports.buildIndex = async function (contents) {
    index = lunr(function () {
        this.field('title');
        this.field('body');
        this.field('category');
        this.field('subcategory');
        this.field('topic');

        // this.add(contents[1]);

        for (let content of contents) {
            this.add(content);
        }
    });

    return {
        search: async function (queryString) {
            if (typeof index === 'undefined') {
                await buildIndex();
            }

            return index.search(queryString);
        }
    }
}

 ```