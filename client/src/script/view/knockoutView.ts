import {FlatNavigationEntry} from '../interface/FlatNavigationEntry';
import {PageChanger} from '../common/PageChanger';
import {FileSearch} from '../../component/file-search/FileSearch';
import {NavMenu} from '../../component/nav-menu/NavMenu';
import Chart = require('chart.js');
import {ViewBarChartDataSet} from './interface/ViewBarChart';
import {ViewCategory} from './interface/ViewCategory';
import {applyBindings, bindingHandlers, components, observable} from 'knockout';
import {ChartHandler} from './handler/ChartHandler';

// @ts-ignore injected by browserify
const chartOptions = require('../../../data/staticChartData.json');
const useDOMContentAsTemplate = (className: string) => `<div class="${className}" data-bind="template: { nodes: $componentTemplateNodes, data: $component }"></div>`;

export class KnockoutView {
    private pageChanger: PageChanger;
    private chartJsPromise: Promise<Chart>;

    public constructor(pageChanger: PageChanger, chartJsPromise: Promise<Chart>) {
        this.pageChanger = pageChanger;
        this.chartJsPromise = chartJsPromise;
    }

    public registerElements(categories: Array<ViewCategory>, data: Array<FlatNavigationEntry>, chartData: ViewBarChartDataSet) {
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

