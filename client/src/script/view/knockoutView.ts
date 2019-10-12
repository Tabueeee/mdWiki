import {FlatNavigationEntry} from '../interface/FlatNavigationEntry';
import {PageChanger} from '../common/PageChanger';
import {FileSearch} from '../../component/file-search/FileSearch';
import {NavMenu} from '../../component/nav-menu/NavMenu';
import {applyBindings, bindingHandlers, components, observable} from 'knockout';
import {ChartHandler} from './handler/ChartHandler';
import {BarChartDataSet} from '../interface/BarChartDataSet';
import Chart = require('chart.js');
import {ViewModelFactory} from './ViewModelFactory';
import {ThemeSelector} from '../../component/theme-selector/ThemeSelector';

const useDOMContentAsTemplate = (className: string) => `<div class="${className}" data-bind="template: { nodes: $componentTemplateNodes, data: $component }"></div>`;

export class KnockoutView {
    private pageChanger: PageChanger;
    private chartJsPromise: Promise<Chart>;
    private categoriesVMFactory: ViewModelFactory;
    private chartData: any;

    public constructor(pageChanger: PageChanger, chartJsPromise: Promise<Chart>, categoriesVMFactory: ViewModelFactory) {
        this.pageChanger = pageChanger;
        this.chartJsPromise = chartJsPromise;
        this.categoriesVMFactory = categoriesVMFactory;
        this.chartData = this.categoriesVMFactory.createChartData();
    }

    public updateChartData(chartData: BarChartDataSet) {
        this.categoriesVMFactory.updateChartData(this.chartData.data, chartData);
    }

    public registerElements(flatNavigationEntries: Array<FlatNavigationEntry>) {
        // register handlers
        bindingHandlers.chart = ChartHandler(this.chartJsPromise);
        const categories = this.categoriesVMFactory.createViewCategories(flatNavigationEntries);

        // register components
        components.register(
            'file-search',
            {template: useDOMContentAsTemplate('file-search'), viewModel: {instance: new FileSearch(flatNavigationEntries)}}
        );
        components.register(
            'theme-selector',
            {template: {element: 'theme-selector-template'}, viewModel: {instance: new ThemeSelector()}}
        );
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
            chartFake1: this.chartData,
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

