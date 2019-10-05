const ko = require('knockout');

module.exports.getChartHandler = function () {
    let Chart;
    return {
        init: function (element, valueAccessor, allBindings, viewModel) {
            // init / load chart.js on demand to reduce stress on FMP - optimally lazy load here
            Chart = Chart || require('chart.js');
            let ctx = element.getContext('2d');
            // passes the object in the active context (here: root view model) with key = passed from binding
            // with: data-bind="chart: 'key'"
            element.chart = new Chart(ctx, ko.toJS(viewModel[valueAccessor()]));
        },
        update: function (element, valueAccessor, allBindings, viewModel) {
            element.chart.data = (Object.assign(element.chart.data, ko.toJS(viewModel[valueAccessor()])).data);
            element.chart.update();
        }
    };
}
