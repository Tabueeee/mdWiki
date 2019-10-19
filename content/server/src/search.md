# G:/dev/01_projects/mdWiki/src/search.js
```js
const lunr = require('lunr');

module.exports.buildIndex = async function (contents) {
    return lunr(function () {
        this.field('title');
        this.field('body');
        this.field('category');
        this.field('subcategory');
        this.field('topic');

        for (let content of contents) {
            this.add(content);
        }
    });
}
 ```