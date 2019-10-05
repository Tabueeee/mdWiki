import {NavigationData} from '../interface/NavigationData';
import {RawNavigationDataEntry} from '../interface/RawNavigationData';

export class CategoriesVMFactory {
    public createVm(data: Array<RawNavigationDataEntry>): NavigationData {
        const categoryMap = this.mapByProp<RawNavigationDataEntry>(data, 'category');

        let categories: NavigationData = [];
        for (let key in categoryMap) {
            const subCategoryMap = this.mapByProp(categoryMap[key], 'subcategory');

            let subCategories = [];
            for (let subCategoryKey in subCategoryMap) {
                let subCategoryItem = {name: subCategoryKey, items: subCategoryMap[subCategoryKey], collapsed: true};
                subCategories.push(subCategoryItem);
            }

            categories.push({name: key, entries: subCategories});
        }

        return categories;
    }

    private mapByProp<T>(data: Array<T>, propName: keyof T): { [index: string]: any } {
        return data.reduce((groups: any, item: T) => {
            const group = (groups[item[propName]] || []);
            group.push(item);
            groups[item[propName]] = group;

            return groups;
        }, {});
    };
}
