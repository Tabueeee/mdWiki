# G:/dev/01_projects/mdWiki/client/src/script/view/component/nav.js
```js
const ko = require('knockout');

module.exports.nav = function (categories) {
    return function () {
        this.navItems = ko.observableArray(categories);
        this.toggle = function (subcategory, clickedEntry) {
            subcategory.entries.replace(clickedEntry, Object.assign({}, clickedEntry, {collapsed: !clickedEntry.collapsed}));
        };
    }
};
 ```