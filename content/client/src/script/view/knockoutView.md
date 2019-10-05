# G:/dev/01_projects/mdWiki/client/src/script/view/knockoutView.ts
```js
import {ChartHandler} from './handler/ChartHandler';
import * as ko from 'knockout';
import {Category, NavigationData, Subcategory} from '../interface/NavigationData';
import {RawNavigationDataEntry} from '../interface/RawNavigationData';
import {Nav} from './component/nav';
import {NavSearch} from './component/NavSearch';
import {PageChanger} from '../common/pageChanger';
import {ViewCategory} from '../interface/ViewCategory';
import {BarChartDataSet} from '../interface/BarChartDataSet';

// @ts-ignore injected by browserify
const chartOptions = require('../../../data/staticChartData.json');
// @ts-ignore injected by browserify
const navTemplate = require('./component/nav-template.html');
const useDOMContentAsTemplate = (className: string) => `<div class="${className}" data-bind="template: { nodes: $componentTemplateNodes, data: $component }"></div>`;

export function registerElements(navigationData: NavigationData, data: Array<RawNavigationDataEntry>, chartData: BarChartDataSet) {

    // create ko-specific view-models
    let categories: Array<ViewCategory> = (<any>navigationData);
    chartData.labels = ko.observableArray<string>(<string[]>chartData.labels);
    chartData.datasets[0].data = ko.observableArray<number>(<number[]>chartData.datasets[0].data);
    chartData.datasets[0].backgroundColor = ko.observableArray<string>(<string[]>chartData.datasets[0].backgroundColor);
    chartData.datasets[0].borderColor = ko.observableArray<string>(<string[]>chartData.datasets[0].borderColor);

    navigationData.forEach(function (category: Category, index: number) {
        categories[index].entries = ko.observableArray<Subcategory>(category.entries);
    });

    // register handlers
    ko.bindingHandlers.chart = new ChartHandler();

    // register components
    ko.components.register('navSearch', {
        template: useDOMContentAsTemplate('nav-search'),
        viewModel: {instance: new NavSearch(data)}
    });
    ko.components.register('nav', {template: navTemplate, viewModel: {instance: new Nav(categories)}});

    // global-scope
    let isLoading = ko.observable(false);
    const pageChanger = new PageChanger(isLoading);

    const rootBindings = {
        changePage: pageChanger.changePage.bind(pageChanger, true),
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
            ko.applyBindings(rootBindings, document.getElementById('content-loaded'));
        }
    });

    // apply root bindings and all containing component/handler bindings
    ko.applyBindings(rootBindings, document.body);
}
 ```