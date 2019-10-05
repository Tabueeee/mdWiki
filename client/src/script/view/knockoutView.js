const ko = require('knockout');
const PageChanger = require('../common/pageChanger');
const chartOptions = require('../../../data/staticChartData.json');
const chartHandler = require('./handler/chart');

const navComponent = require('./component/nav').nav;
const navTemplate = require('./component/nav-template.html');

const useDOMContentAsTemplate = (className) => `<div class="${className}" data-bind="template: { nodes: $componentTemplateNodes, data: $component }"></div>`;
const navSearchComponent = require('./component/navSearch').navSearch;

module.exports.registerElements = function (categories, data, chartData) {

    // create ko-specific view-models
    chartData.labels = ko.observableArray(chartData.labels);
    chartData.datasets[0].data = ko.observableArray(chartData.datasets[0].data);
    chartData.datasets[0].backgroundColor = ko.observableArray(chartData.datasets[0].backgroundColor);
    chartData.datasets[0].borderColor = ko.observableArray(chartData.datasets[0].borderColor);

    categories.forEach(function (category) {
        category.entries = ko.observableArray(category.entries);
    });

    // register handlers
    ko.bindingHandlers.chart = chartHandler.getChartHandler(ko);

    // register components
    ko.components.register('navSearch', {
        template: useDOMContentAsTemplate('nav-search'),
        viewModel: navSearchComponent
    });
    ko.components.register('nav', {template: navTemplate, viewModel: navComponent(categories)});

    // global-scope
    let isLoading = ko.observable(false);
    const pageChanger = PageChanger(isLoading);

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
