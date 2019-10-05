# G:/dev/01_projects/mdWiki/client/src/script/view/handler/ChartHandler.ts
```js
import * as ko from 'knockout';
import Chart = require('chart.js');

export class ChartHandler implements KnockoutBindingHandler {
    public init(element: any, valueAccessor: () => any, _allBindings: KnockoutAllBindingsAccessor, viewModel: any) {
        // init / load chart.js on demand to reduce stress on FMP - optimally lazy load here
        // @ts-ignore injected by browserify
        let ctx = element.getContext('2d');
        // passes the object in the active context (here: root view model) with key = passed from binding
        // with: data-bind="chart: 'key'"
        element.chart = new Chart(ctx, ko.toJS(viewModel[valueAccessor()]));
    }

    public update(element: any, valueAccessor: () => any, _allBindings: KnockoutAllBindingsAccessor, viewModel: any) {
        element.chart.data = (Object.assign(element.chart.data, ko.toJS(viewModel[valueAccessor()])).data);
        element.chart.update();
    }
}
 ```