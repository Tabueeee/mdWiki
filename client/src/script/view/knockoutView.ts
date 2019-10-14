import {FlatNavigationEntry} from '../interface/FlatNavigationEntry';
import {PageChanger} from '../common/PageChanger';
import {FileSearch} from '../../component/file-search/FileSearch';
import {NavMenu} from '../../component/nav-menu/NavMenu';
import {applyBindings, bindingHandlers, components, Observable, observable} from 'knockout';
import {ChartHandler} from './handler/ChartHandler';
import {BarChartDataSet} from '../interface/BarChartDataSet';
import {ViewModelFactory} from './ViewModelFactory';
import {ThemeSelector} from '../../component/theme-selector/ThemeSelector';
import {PageState} from '../interface/PageState';
import Chart = require('chart.js');

const useDOMContentAsTemplate = (className: string) => `<div class="${className}" data-bind="template: { nodes: $componentTemplateNodes, data: $component }"></div>`;

export class KnockoutView {
    private chartJsPromise: Promise<Chart>;
    private categoriesVMFactory: ViewModelFactory;
    private isLoading: Observable<boolean> = observable(false);
    private rootBindings: any = {};

    public constructor(pageChanger: PageChanger, chartJsPromise: Promise<Chart>, categoriesVMFactory: ViewModelFactory) {
        this.chartJsPromise = chartJsPromise;
        this.categoriesVMFactory = categoriesVMFactory;
        pageChanger.subscribeLoadingStateChange(this.onPageChange.bind(this));
        // global-scope
        const currentUrl = observable(window.location.pathname);

        this.rootBindings = {
            currentUrl: currentUrl,
            changePage: (url: string) => {
                currentUrl(url);
                pageChanger.changePage(true, url);
            },
            // add chart to global scope because lazy - probably better injected via data-attribute or ajax route
            chartFake1: this.categoriesVMFactory.createChartData(),
            isLoading: this.isLoading
        };
    }

    public updateChartData(chartData: BarChartDataSet) {
        this.categoriesVMFactory.updateChartData(this.rootBindings.chartFake1.data, chartData);
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
        components.register(
            'body-message',
            {template: {element: 'body-message-template'}}
        );
        components.register(
            'nav-menu',
            {template: {element: 'nav-menu-template'}, viewModel: {instance: new NavMenu(categories)}}
        );

        // apply root bindings and all containing component/handler bindings
        applyBindings(this.rootBindings, document.body);
    }

    public onPageChange(pageState: PageState) {
        let contentElement: HTMLElement = (<HTMLElement>document.getElementById('content'));
        if (!pageState.isLoading) {
            let contentNode = document.createElement('div');

            if (pageState.successful && typeof pageState.response === 'string') {
                contentNode.innerHTML = pageState.response;
            } else {
                contentNode.innerHTML = `
                <body-message params="level: 'is-danger'">
                        <p>Server is unavailable you can try again below:</p>
                        message: "${pageState.response}"
                        <a href="${pageState.requestLink}" data-bind="click: $root.changePage.bind(null, '${pageState.requestLink}')"><strong>try again</strong></a>
                </body-message>`;
            }

            contentNode.setAttribute('class', 'content');
            contentElement.appendChild(contentNode);
            // update view on finished loading
            applyBindings(this.rootBindings, contentNode);
        } else {
            contentElement.innerHTML = '';
        }

        this.isLoading(pageState.isLoading);
    }
}

