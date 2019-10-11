# G:/dev/01_projects/mdWiki/client/src/script/view/handler/ChartHandler.ts
```js
import {BindingHandler, toJS} from 'knockout';

export function ChartHandler(ChartResolvedPromise: Promise<any>): BindingHandler {
    const init = (element: any, valueAccessor: () => any) => {
        // fake active chart for knockout to make it's binding connection
        element.chart = {data: (Object.assign({}, toJS(valueAccessor())).data), update: () => undefined};

        // lazy load chart.js to reduce stress on FMP
        ChartResolvedPromise
            .then((Chart: any) => {
                let ctx = element.getContext('2d');
                // 'valueAccessor()' accesses the passed object-key referencing the active context (here: root view model)
                element.chart = new Chart(ctx, toJS(valueAccessor()));
                element.chart.data = (Object.assign(element.chart.data, toJS(valueAccessor())).data);
                element.chart.update();
            });
    };

    const update = (element: any, valueAccessor: () => any) => {
        element.chart.data = (Object.assign(element.chart.data, toJS(valueAccessor())).data);
        element.chart.update();
    };

    return {
        init,
        update
    };
}
 ```