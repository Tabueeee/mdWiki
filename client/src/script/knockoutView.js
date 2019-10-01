const ko = require('knockout');
const getRequestOptions = require('../../data/getRequestOptions.json');
const navTemplate = require('./nav-template.html');

let rejectPageChangePromise = () => undefined;

function changePage(link) {
    let contentElement = document.getElementById('content');

    rejectPageChangePromise();
    new Promise(async (resolve, reject) => {
        try {
            rejectPageChangePromise = reject;
            let response = await fetch('http://127.0.0.1:3001' + link + "?content=1", getRequestOptions);

            resolve(await response.text());
        } catch (e) {
            console.error(e);
        }
    }).then((text) => {
        contentElement.innerHTML = text;
        history.pushState({}, link.substr(link.lastIndexOf('/')), 'http://127.0.0.1:3001' + link);
        window.hljs.initHighlighting.called = false;
        window.hljs.initHighlighting();
    }).catch(() => undefined);
}

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
                console.log([subcategory, subcategory.entries]);
                subcategory.entries.replace(clickedEntry, Object.assign({}, clickedEntry, {collapsed: !clickedEntry.collapsed}));
            };
            console.log('navItems');
            console.log(this.navItems);
        }
    });

    ko.applyBindings({changePage: changePage});
}