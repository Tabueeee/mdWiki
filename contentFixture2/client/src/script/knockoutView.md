# G:/dev/01_projects/mdWiki/client/src/script/knockoutView.js
```js
const ko = require('knockout');
const navTemplate = require('./nav-template.html');

module.exports.registerElements = function (categories, data) {
    categories.forEach(function (category) {
        category.entries = ko.observableArray(category.entries);
    })

    ko.components.register('navSearch', {
        template: '<div class="nav-search" data-bind="template: { nodes: $componentTemplateNodes, data: {searchString: searchString, filteredItems: filteredItems} }"></div>',
        viewModel: function () {
            this.searchString = ko.observable('');
            this.filteredItems = ko.computed(function () {
                if (this.searchString() === '') {
                    return [];
                }

                return data.filter((item) => (item.filePath.toLowerCase()).includes((this.searchString().toLocaleLowerCase())));
            }, this);
        }
    });

    ko.components.register('nav', {
        template: navTemplate,
        viewModel: function () {
            this.navItems = ko.observableArray(categories);
            this.toggle = function (subcategory, clickedEntry) {
                subcategory.entries.replace(clickedEntry, Object.assign({}, clickedEntry, {collapsed: !clickedEntry.collapsed}));
            };
        }
    });

    let showSpinner = ko.observable(false);
    const changePage = require('./pageChanger')(showSpinner).changePage;

    showSpinner.subscribe((newValue) => {
        if (!newValue) {
            ko.applyBindings({changePage: changePage.bind(null, true)}, document.getElementById('content-loaded'));
        }
    });

    ko.applyBindings({changePage: changePage.bind(null, true), showSpinner: showSpinner});
}
 ```