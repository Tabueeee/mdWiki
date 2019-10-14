import {BindingHandler, toJS} from 'knockout';
import {__assign} from 'tslib';

export function ChartHandler(ChartResolvedPromise: Promise<any>): BindingHandler {
    const init = (element: any, valueAccessor: () => any) => {
        // fake active chart for knockout to make it's binding connection
        element.chart = {data: (__assign({}, toJS(valueAccessor())).data), update: () => undefined};

        // lazy load chart.js to reduce stress on FMP
        ChartResolvedPromise
            .then((Chart: any) => {
                let ctx = element.getContext('2d');
                // 'valueAccessor()' accesses the passed object-key referencing the active context (here: root view model)
                element.chart = new Chart(ctx, toJS(valueAccessor()));
                element.chart.data = (__assign(element.chart.data, toJS(valueAccessor())).data);
                element.chart.update();
            });
    };

    const update = (element: any, valueAccessor: () => any) => {
        element.chart.data = (__assign(element.chart.data, toJS(valueAccessor())).data);
        element.chart.update();
    };

    return {
        init,
        update
    };
}
