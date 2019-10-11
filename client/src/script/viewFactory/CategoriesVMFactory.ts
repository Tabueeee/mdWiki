import {FlatNavigationEntry} from '../interface/FlatNavigationEntry';
import {observable, observableArray} from 'knockout';
import {Subcategory, ViewCategory} from '../view/interface/ViewCategory';
import {BarChartDataSet} from '../interface/BarChartDataSet';
import {ViewBarChartDataSet} from '../view/interface/ViewBarChart';

export class CategoriesVMFactory {
    public createVm(flatNavigationEntries: Array<FlatNavigationEntry>, barChartDataSet: BarChartDataSet) {
        return {
            flatNavigationEntries,
            categories: this.createViewCategories(flatNavigationEntries),
            barChartView: this.createBarChartVm(barChartDataSet)
        };
    }

    private createViewCategories(flatNavigationEntries: Array<FlatNavigationEntry>): Array<ViewCategory> {
        const categoryMap = this.mapByProp<FlatNavigationEntry>(flatNavigationEntries, 'category');

        let categories: Array<ViewCategory> = [];
        for (let key in categoryMap) {
            const subCategoryMap = this.mapByProp(categoryMap[key], 'subcategory');

            let subCategories: Array<Subcategory> = [];
            for (let subCategoryKey in subCategoryMap) {
                let subCategoryItem = {name: subCategoryKey, items: subCategoryMap[subCategoryKey], collapsed: observable(true)};
                subCategories.push(subCategoryItem);
            }

            categories.push({name: key, entries: observableArray(subCategories)});
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

    private createBarChartVm(barChartDataSet: BarChartDataSet): ViewBarChartDataSet {
        return {
            labels: observableArray<string>(barChartDataSet.labels),
            datasets: [
                Object.assign({}, barChartDataSet.datasets[0], {
                    data: observableArray<number>(barChartDataSet.datasets[0].data),
                    backgroundColor: observableArray<string>(barChartDataSet.datasets[0].backgroundColor),
                    borderColor: observableArray<string>(barChartDataSet.datasets[0].borderColor)
                })
            ]
        };
    }

}
