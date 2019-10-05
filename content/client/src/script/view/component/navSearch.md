# G:/dev/01_projects/mdWiki/client/src/script/view/component/navSearch.js
```js
const ko = require('knockout');

module.exports.navSearch = function () {
    this.searchString = ko.observable('');
    this.filteredItems = ko.computed(function () {
        if (this.searchString() === '') {
            return [];
        }

        return data.filter((item) => (item.url.toLowerCase()).includes((this.searchString().toLocaleLowerCase())));
    }, this);
};
 ```