import {ChartHandler} from './handler/ChartHandler';
import {Category, NavigationData, Subcategory} from '../interface/NavigationData';
import {RawNavigationDataEntry} from '../interface/RawNavigationData';
import {Nav} from './component/nav';
import {NavSearch} from './component/NavSearch';
import {PageChanger} from '../common/pageChanger';
import {ViewCategory} from '../interface/ViewCategory';
import {BarChartDataSet} from '../interface/BarChartDataSet';
import {applyBindings, bindingHandlers, components, observable, observableArray} from 'knockout';

// @ts-ignore injected by browserify
const chartOptions = require('../../../data/staticChartData.json');
// @ts-ignore injected by browserify
const navTemplate = require('./component/nav-template.html');
const useDOMContentAsTemplate = (className: string) => `<div class="${className}" data-bind="template: { nodes: $componentTemplateNodes, data: $component }"></div>`;

export function registerElements(navigationData: NavigationData, data: Array<RawNavigationDataEntry>, chartData: BarChartDataSet) {

    // create ko-specific view-models
    let categories: Array<ViewCategory> = (<any>navigationData);
    chartData.labels = observableArray<string>(<string[]>chartData.labels);
    chartData.datasets[0].data = observableArray<number>(<number[]>chartData.datasets[0].data);
    chartData.datasets[0].backgroundColor = observableArray<string>(<string[]>chartData.datasets[0].backgroundColor);
    chartData.datasets[0].borderColor = observableArray<string>(<string[]>chartData.datasets[0].borderColor);

    navigationData.forEach(function (category: Category, index: number) {
        categories[index].entries = observableArray<Subcategory>(category.entries);
    });

    // register handlers
    bindingHandlers.chart = new ChartHandler();

    // register components
    components.register('navSearch', {
        template: useDOMContentAsTemplate('nav-search'),
        viewModel: {instance: new NavSearch(data)}
    });
    components.register('nav', {template: navTemplate, viewModel: {instance: new Nav(categories)}});

    // global-scope
    let isLoading = observable(false);
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
            applyBindings(rootBindings, document.getElementById('content-loaded'));
        }
    });

    // apply root bindings and all containing component/handler bindings
    applyBindings(rootBindings, document.body);
}
