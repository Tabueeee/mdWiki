# G:/dev/01_projects/mdWiki/client/src/script/main.ts
```js
import {CategoriesVMFactory} from './viewFactory/CategoriesVMFactory';
import {NavigationData} from './interface/NavigationData';
import {FlatNavigationEntryList} from './interface/FlatNavigationEntryList';
import {KnockoutView} from './view/knockoutView';
import {BarChartDataSet} from './interface/BarChartDataSet';
import {PageChanger} from './common/PageChanger';
import {getScript} from './common/getScript';
// not injected by browserify - loaded lazily
import * as hljs from 'highlight.js';
// not injected by browserify - loaded lazily
import Chart = require('chart.js');
// @ts-ignore injected by browserify
const chartData: BarChartDataSet = require('../../data/mockedChartData.json');
const rawNavigationData: Array<FlatNavigationEntryList> = window.data || [];
const navigationData: NavigationData = new CategoriesVMFactory().createVm(rawNavigationData);
// @ts-ignore injected by browserify
const getRequestOptions = require('../../data/getRequestOptions.json');

const httpHelper: HttpHelper = new HttpHelper(getRequestOptions);
const pageChanger: PageChanger = new PageChanger(httpHelper);

// Lazily load 3rd Party Scripts
let chartJSLoadedPromise: Promise<Chart> = getScript<Chart>('//cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.bundle.min.js', 'Chart');
let highlightJSLoadedPromise: Promise<typeof hljs> = getScript<typeof hljs>(
    '//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.10/highlight.min.js',
    'hljs'
);
highlightJSLoadedPromise
    .then(function (hl: typeof hljs) {
        hl.initHighlighting();
        // refresh hljs on page load
        pageChanger.subscribeLoadingStateChange((loadingState: boolean) => {
            if (!loadingState) {
                // undocumented property
                (<any>hl.initHighlighting).called = false;
                hl.initHighlighting();
            }
        });
    });


let koView: KnockoutView = new KnockoutView(pageChanger, chartJSLoadedPromise);
koView.registerElements(navigationData, rawNavigationData, chartData);


// simulate changing chartData
let intervalIndex = 0;
setInterval(() => {
    if (document.body.querySelector('canvas')) {
        console.log('creating new entry: NEW_' + (intervalIndex + 1));
        console.log(chartData);
        chartData.labels.push('NEW_' + intervalIndex ++);
        chartData.datasets[0].data.push(Math.floor(Math.random() * 100));
        chartData.datasets[0].backgroundColor.push(
            `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)`
        );
        chartData.datasets[0].borderColor.push(
            `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)`
        );
    }
}, (5000 + Math.floor(Math.random() * 10000)));
 ```