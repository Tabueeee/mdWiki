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
