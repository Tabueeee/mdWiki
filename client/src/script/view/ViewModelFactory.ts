import {FlatNavigationEntry} from '../interface/FlatNavigationEntry';
import {observable, observableArray} from 'knockout';
import {Subcategory, ViewCategory} from '../view/interface/ViewCategory';
import {BarChartDataSet} from '../interface/BarChartDataSet';
import {ViewBarChartDataSet} from '../view/interface/ViewBarChart';
// @ts-ignore injected by browserify
const chartOptions = require('../../../data/staticChartData.json');

export class ViewModelFactory {
    public createViewCategories(flatNavigationEntries: Array<FlatNavigationEntry>): Array<ViewCategory> {
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

    public createChartData(): { type: string, data: ViewBarChartDataSet, options: any } {
        return {
            type: 'bar',
            data: {
                labels: observableArray<string>([]),
                datasets: [
                    {
                        label: observable<string>(''),
                        borderWidth: observable<number>(0),
                        data: observableArray<number>([]),
                        backgroundColor: observableArray<string>([]),
                        borderColor: observableArray<string>([])
                    }
                ]
            },
            options: chartOptions
        };
    }

    public updateChartData(viewChartData: ViewBarChartDataSet, chartData: BarChartDataSet): void {
        viewChartData.labels(chartData.labels);
        viewChartData.datasets[0].label(chartData.datasets[0].label);
        viewChartData.datasets[0].borderWidth(chartData.datasets[0].borderWidth);
        viewChartData.datasets[0].data(chartData.datasets[0].data);
        viewChartData.datasets[0].backgroundColor(chartData.datasets[0].backgroundColor);
        viewChartData.datasets[0].borderColor(chartData.datasets[0].borderColor);
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
