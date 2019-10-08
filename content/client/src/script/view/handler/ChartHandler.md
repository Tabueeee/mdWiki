# G:/dev/01_projects/mdWiki/client/src/script/view/handler/ChartHandler.ts
```js
import Chart = require('chart.js');
import {AllBindings, BindingHandler, toJS} from 'knockout';

export class ChartHandler implements BindingHandler {
    public init(element: any, valueAccessor: () => any, _allBindings: AllBindings, viewModel: any) {
        // init / load chart.js on demand to reduce stress on FMP - optimally lazy load here
        // @ts-ignore injected by browserify
        let ctx = element.getContext('2d');
        // passes the object in the active context (here: root view model) with key = passed from binding
        // with: data-bind="chart: 'key'"
        element.chart = new Chart(ctx, toJS(viewModel[valueAccessor()]));
    }

    public update(element: any, valueAccessor: () => any, _allBindings: AllBindings, viewModel: any) {
        element.chart.data = (Object.assign(element.chart.data, toJS(viewModel[valueAccessor()])).data);
        element.chart.update();
    }
}
 ```