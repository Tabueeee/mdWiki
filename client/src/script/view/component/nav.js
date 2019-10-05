const ko = require('knockout');

module.exports.nav = function (categories) {
    return function () {
        this.navItems = ko.observableArray(categories);
        this.toggle = function (subcategory, clickedEntry) {
            subcategory.entries.replace(clickedEntry, Object.assign({}, clickedEntry, {collapsed: !clickedEntry.collapsed}));
        };
    }
};
