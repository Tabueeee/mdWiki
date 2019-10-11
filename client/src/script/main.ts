import {CategoriesVMFactory} from './viewFactory/CategoriesVMFactory';
import {FlatNavigationEntry} from './interface/FlatNavigationEntry';
import {KnockoutView} from './view/knockoutView';
import {BarChartDataSet} from './interface/BarChartDataSet';
import {PageChanger} from './common/PageChanger';
import {getScript} from './common/getScript';
// not injected by browserify - loaded lazily
import * as hljs from 'highlight.js';
// not injected by browserify - loaded lazily
import Chart = require('chart.js');
import {HttpHelper} from './common/HttpHelper';
// @ts-ignore injected by browserify
const chartData: BarChartDataSet = require('../../data/mockedChartData.json');
const rawNavigationData: Array<FlatNavigationEntry> = window.data || [];

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
    }).catch(() => undefined);

let {flatNavigationEntries, categories, barChartView} =  new CategoriesVMFactory().createVm(rawNavigationData, chartData);

let koView: KnockoutView = new KnockoutView(pageChanger, chartJSLoadedPromise);
koView.registerElements(categories, flatNavigationEntries, barChartView);

// simulate changing chartData
let intervalIndex = 0;
setInterval(() => {
    // In real application data might come from ajax / (redux) state updates / user input etc.
    if (document.body.querySelector('canvas')) {
        barChartView.labels.push('NEW_' + intervalIndex ++);
        barChartView.datasets[0].data.push(Math.floor(Math.random() * 100));
        barChartView.datasets[0].backgroundColor.push(
            `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)`
        );
        barChartView.datasets[0].borderColor.push(
            `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)`
        );
    }
}, (5000 + Math.floor(Math.random() * 10000)));
