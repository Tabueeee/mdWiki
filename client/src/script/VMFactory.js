const mapByProp = function (data, propName) {
    return data.reduce((groups, item) => {
        const group = (groups[item[propName]] || []);
        group.push(item);
        groups[item[propName]] = group;

        return groups;
    }, {});
}

module.exports.createVm = function (data) {
    const categoryMap = mapByProp(data, 'category');

    let categories = [];
    for (let key in categoryMap) {
        const subCategoryMap = mapByProp(categoryMap[key], 'subcategory');

        let subCategories = [];
        for (let subCategoryKey in subCategoryMap) {
            let subCategoryItem = {name: subCategoryKey, items: subCategoryMap[subCategoryKey], collapsed: true};
            subCategories.push(subCategoryItem);
        }

        categories.push({name: key, entries: subCategories});
    }

    return categories;
}
