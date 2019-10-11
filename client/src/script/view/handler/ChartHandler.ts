import {BindingHandler, toJS} from 'knockout';

export class ChartHandler implements BindingHandler {
    private ChartResolvedPromise: Promise<any>;

    public constructor(ChartResolvedPromise: Promise<any>) {
        this.ChartResolvedPromise = ChartResolvedPromise;
    }

    public init(element: any, valueAccessor: () => any) {
        // fake active chart for knockout to make it'S binding connection
        element.chart = {data: (Object.assign({}, toJS(valueAccessor())).data), update: () => undefined};

        // lazy load chart.js to reduce stress on FMP
        this.ChartResolvedPromise
            .then((Chart: any) => {
                let ctx = element.getContext('2d');
                // 'valueAccessor()' accesses the passed object-key referencing the active context (here: root view model)
                element.chart = new Chart(ctx, toJS(valueAccessor()));
                element.chart.data = (Object.assign(element.chart.data, toJS(valueAccessor())).data);
                element.chart.update();
            });
    }

    public update(element: any, valueAccessor: () => any) {
        element.chart.data = (Object.assign(element.chart.data, toJS(valueAccessor())).data);
        element.chart.update();
    }

    public createHandler() {
        return {
            init: this.init.bind(this),
            update: this.update.bind(this)
        };
    }
}
