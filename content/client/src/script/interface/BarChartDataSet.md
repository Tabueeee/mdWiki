# G:/dev/01_projects/mdWiki/client/src/script/interface/BarChartDataSet.ts
```js
export interface BarChartDataSet {
    labels: Array<string>,
    datasets: Array<BarChartDataSetEntry>
}

export interface BarChartDataSetEntry {
    label: string;
    data: Array<number>;
    backgroundColor: Array<string>;
    borderColor: Array<string>;
    borderWidth: number;
}
 ```