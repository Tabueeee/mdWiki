# G:/dev/01_projects/mdWiki/client/src/script/interface/BarChartDataSet.ts
```js
import {ObservableArray} from 'knockout';

export interface BarChartDataSet {
    'labels': Array<string> | ObservableArray<string>,
    'datasets': Array<BarChartDataSetEntry>
}

interface BarChartDataSetEntry {
    'label': string;
    'data': Array<number> | ObservableArray<number>;
    'backgroundColor': Array<string> | ObservableArray<string>;
    'borderColor': Array<string> | ObservableArray<string>;
    'borderWidth': number;
}
 ```