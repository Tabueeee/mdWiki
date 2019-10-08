# G:/dev/01_projects/mdWiki/client/src/script/main.ts
```js
import {CategoriesVMFactory} from './viewFactory/CategoriesVMFactory';
import {NavigationData} from './interface/NavigationData';
import {RawNavigationDataEntry} from './interface/RawNavigationData';
import {registerElements} from './view/knockoutView';
import {BarChartDataSet} from './interface/BarChartDataSet';
// @ts-ignore injected by browserify
const chartData: BarChartDataSet = require('../../data/mockedChartData.json');
const rawNavigationData: Array<RawNavigationDataEntry> = window.data || [];
const navigationData: NavigationData = new CategoriesVMFactory().createVm(rawNavigationData);

registerElements(navigationData, rawNavigationData, chartData);

// simulate changing chartData
let intervalIndex = 0;
setInterval(() => {
    if (document.body.querySelector('canvas')) {
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