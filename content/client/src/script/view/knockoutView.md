# G:/dev/01_projects/mdWiki/client/src/script/view/knockoutView.ts
```js
import {ChartHandler} from './handler/ChartHandler';
import {Category, NavigationData, Subcategory} from '../interface/NavigationData';
import {FlatNavigationEntryList} from '../interface/FlatNavigationEntryList';
import {PageChanger} from '../common/PageChanger';
import {ViewCategory} from '../interface/ViewCategory';
import {BarChartDataSet} from '../interface/BarChartDataSet';
import {applyBindings, bindingHandlers, components, Observable, observable, ObservableArray, observableArray} from 'knockout';
import {FileSearch} from '../../component/file-search/FileSearch';
import {NavMenu} from '../../component/nav-menu/NavMenu';
import Chart = require('chart.js');

// @ts-ignore injected by browserify
const chartOptions = require('../../../data/staticChartData.json');
const useDOMContentAsTemplate = (className: string) => `<div class="${className}" data-bind="template: { nodes: $componentTemplateNodes, data: $component }"></div>`;

type viewObject<T> = {
    [P in keyof T]?: T[P] | Observable | ObservableArray;
}

export class KnockoutView {
    private pageChanger: PageChanger;
    private chartJsPromise: Promise<Chart>;

    public constructor(pageChanger: PageChanger, chartJsPromise: Promise<Chart>) {
        this.pageChanger = pageChanger;
        this.chartJsPromise = chartJsPromise;
    }

    public registerElements(navigationData: NavigationData, data: Array<FlatNavigationEntryList>, chartData: viewObject<BarChartDataSet>) {
        // create ko-specific view-models / make vm ko-specific
        let categories: Array<ViewCategory> = (<any>navigationData);
        chartData.labels = observableArray<string>(<string[]>chartData.labels);
        chartData.datasets[0].data = observableArray<number>(<number[]>chartData.datasets[0].data);
        chartData.datasets[0].backgroundColor = observableArray<string>(<string[]>chartData.datasets[0].backgroundColor);
        chartData.datasets[0].borderColor = observableArray<string>(<string[]>chartData.datasets[0].borderColor);

        navigationData.forEach(function (category: Category, index: number) {
            categories[index].entries = observableArray<Subcategory>(category.entries);
        });

        // register handlers
        bindingHandlers.chart = ChartHandler(this.chartJsPromise);

        // register components
        components.register('file-search', {
            template: useDOMContentAsTemplate('file-search'),
            viewModel: {instance: new FileSearch(data)}
        });
        components.register('nav-menu', {template: {element: 'nav-menu-template'}, viewModel: {instance: new NavMenu(categories)}});

        // global-scope
        let isLoading = observable(false);
        this.pageChanger.subscribeLoadingStateChange(isLoading);
        const currentUrl = observable(window.location.pathname);

        const rootBindings = {
            currentUrl: currentUrl,
            changePage: (url: string) => {
                currentUrl(url);
                this.pageChanger.changePage(true, url);
            },
            // add chart to global scope because lazy - probably better injected via data-attribute or ajax route
            chartFake1: {
                type: 'bar',
                data: chartData,
                options: chartOptions
            },
            isLoading: isLoading
        };

        // update view on finished loading
        isLoading.subscribe((isLoading) => {
            if (!isLoading) {
                applyBindings(rootBindings, document.getElementById('content-loaded'));
            }
        });

        // apply root bindings and all containing component/handler bindings
        applyBindings(rootBindings, document.body);
    }
}

 ```