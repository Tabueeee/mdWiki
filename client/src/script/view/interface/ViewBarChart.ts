import {Observable, ObservableArray} from 'knockout';

export interface ViewBarChartDataSet {
    'labels': ObservableArray<string>,
    'datasets': Array<ViewBarChartDataSetEntry>
}

interface ViewBarChartDataSetEntry {
    'label': Observable<string>;
    'data': ObservableArray<number>;
    'backgroundColor': ObservableArray<string>;
    'borderColor': ObservableArray<string>;
    'borderWidth': Observable<number>;
}
