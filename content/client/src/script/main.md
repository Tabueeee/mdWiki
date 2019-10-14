# G:/dev/01_projects/mdWiki/client/src/script/main.ts
```typescript
import {FlatNavigationEntry} from './interface/FlatNavigationEntry';
import {KnockoutView} from './view/knockoutView';
import {BarChartDataSet} from './interface/BarChartDataSet';
import {getScript} from './common/getScript';
// not injected by browserify - loaded lazily
import * as hljs from 'highlight.js';
import {HttpHelper} from './common/HttpHelper';
import {ViewModelFactory} from './view/ViewModelFactory';
// not injected by browserify - loaded lazily
import Chart = require('chart.js');
import {PageState} from './interface/PageState';
import {PageChanger} from './common/PageChanger';
// @ts-ignore injected by browserify
const chartData: BarChartDataSet = require('../../data/mockedChartData.json');
const flatNavigationEntries: Array<FlatNavigationEntry> = window.serverData.flatNavigationEntries || [];

// @ts-ignore injected by browserify
const getRequestOptions = require('../../data/getRequestOptions.json');

const httpHelper: HttpHelper = new HttpHelper(getRequestOptions);
const pageChanger: PageChanger = new PageChanger(httpHelper);
const viewModelFactory: ViewModelFactory = new ViewModelFactory();

// Lazily load 3rd Party Scripts
let chartJSLoadedPromise: Promise<Chart> = getScript<Chart>('https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.bundle.min.js', 'Chart');

let highlightJSLoadedPromise: Promise<typeof hljs> = getScript<typeof hljs>(
    '/highlight.js',
    'hljs'
);
highlightJSLoadedPromise
    .then(function (hl: typeof hljs) {
        hl.initHighlighting();

        // refresh hljs on page load
        pageChanger.subscribeLoadingStateChange((loadingState: PageState) => {
            if (!loadingState.isLoading && loadingState.successful) {
                // undocumented property
                (<any>hl.initHighlighting).called = false;
                hl.initHighlighting();
            }
        });
    }).catch(() => undefined);

let koView: KnockoutView = new KnockoutView(pageChanger, chartJSLoadedPromise, viewModelFactory);
koView.registerElements(flatNavigationEntries);
koView.updateChartData(chartData);

// simulate changing chartData
let intervalIndex = 0;
setInterval(() => {
    // In real application data might come from ajax / (redux) state updates / user input etc.
    if (document.body.querySelector('canvas')) {
        chartData.labels.push('NEW_' + intervalIndex ++);
        chartData.datasets[0].data.push(Math.floor(Math.random() * 100));
        chartData.datasets[0].backgroundColor.push(
            `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)`
        );
        chartData.datasets[0].borderColor.push(
            `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)`
        );

        koView.updateChartData(chartData);
    }
}, (5000 + Math.floor(Math.random() * 10000)));
 ```