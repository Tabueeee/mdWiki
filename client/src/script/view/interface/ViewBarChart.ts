import {ObservableArray} from 'knockout';

export interface ViewBarChartDataSet {
    'labels': ObservableArray<string>,
    'datasets': Array<ViewBarChartDataSetEntry>
}

interface ViewBarChartDataSetEntry {
    'label': string;
    'data': ObservableArray<number>;
    'backgroundColor': ObservableArray<string>;
    'borderColor': ObservableArray<string>;
    'borderWidth': number;
}
