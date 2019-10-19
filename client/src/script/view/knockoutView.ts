import {FlatNavigationEntry} from '../interface/FlatNavigationEntry';
import {FileSearch} from '../../component/file-search/FileSearch';
import {NavMenu} from '../../component/nav-menu/NavMenu';
import {applyBindings, bindingHandlers, components, Observable, observable} from 'knockout';
import {ChartHandler} from './handler/ChartHandler';
import {BarChartDataSet} from '../interface/BarChartDataSet';
import {ViewModelFactory} from './ViewModelFactory';
import {ThemeSelector} from '../../component/theme-selector/ThemeSelector';
import {PageState} from '../interface/PageState';
import {SearchPopup} from '../../component/search-popup/SearchPopup';
import {Actions} from '../Actions';
import Chart = require('chart.js');

const useDOMContentAsTemplate = (className: string) => `<div class="${className}" data-bind="template: { nodes: $componentTemplateNodes, data: $component }"></div>`;

export class KnockoutView {
    private chartJsPromise: Promise<Chart>;
    private actions: Actions;
    private categoriesVMFactory: ViewModelFactory;
    private isLoading: Observable<boolean> = observable(false);
    private rootBindings: any = {};
    private searchController: SearchPopup;

    public constructor(chartJsPromise: Promise<Chart>, categoriesVMFactory: ViewModelFactory, actions: Actions) {
        this.actions = actions;
        this.chartJsPromise = chartJsPromise;
        this.categoriesVMFactory = categoriesVMFactory;
        // global-scope
        const currentUrl = observable(window.location.pathname);

        let searchString = '';
        if (window.location.pathname === '/searchResult.html') {
            searchString = ((window.location.search.substr(1).split('&').map(item => item.split('=')).map(item => {
                return {key: item[0], value: item[1]};
            }).find(item => item.key === 'q') || {}).value || '');
        }

        this.searchController = new SearchPopup(this.actions, searchString);

        this.rootBindings = {
            currentUrl: currentUrl,
            changePage: (url: string) => {
                currentUrl(url);
                this.actions.changePageContent(url);
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
        let searchController = this.searchController;
        // register handlers
        bindingHandlers.chart = ChartHandler(this.chartJsPromise);
        const categories = this.categoriesVMFactory.createViewCategories(flatNavigationEntries);

        // register components
        components.register(
            'file-search',
            {template: useDOMContentAsTemplate('file-search'), viewModel: {instance: new FileSearch(flatNavigationEntries)}}
        );
        components.register(
            'search-input',
            {
                template: {element: 'search-input-template'}, viewModel: function (props: { hasFocus: boolean }) {
                    if (!props.hasFocus) {
                        return Object.assign({}, searchController, {hasFocus: observable(true)});
                    }

                    return searchController;
                }
            }
        );
        components.register(
            'search-results',
            {template: {element: 'search-results-template'}, viewModel: {instance: this.searchController}}
        );

        components.register(
            'search-popup',
            {template: useDOMContentAsTemplate('search-popup'), viewModel: {instance: this.searchController}}
        );
        components.register(
            'theme-selector',
            {template: {element: 'theme-selector-template'}, viewModel: {instance: new ThemeSelector(this.actions)}}
        );
        components.register(
            'body-message',
            {template: {element: 'body-message-template'}}
        );
        components.register(
            'loading-indicator',
            {template: {element: 'loading-indicator-template'}}
        );
        components.register(
            'nav-menu',
            {
                template: {element: 'nav-menu-template'}, viewModel: function () {
                    return new NavMenu(categories);
                }
            }
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

    public toggleSearchModal() {
        this.searchController.visible(!this.searchController.visible.peek());
        this.searchController.hasFocus(this.searchController.visible.peek());
    }
}

