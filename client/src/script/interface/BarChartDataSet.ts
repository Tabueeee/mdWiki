export interface BarChartDataSet {
    'labels': Array<string>,
    'datasets': Array<BarChartDataSetEntry>
}

export interface BarChartDataSetEntry {
    'label': string;
    'data': Array<number>;
    'backgroundColor': Array<string>;
    'borderColor': Array<string>;
    'borderWidth': number;
}
