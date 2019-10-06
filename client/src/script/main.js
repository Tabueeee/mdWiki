const categoryVmFactory = require('./viewFactory/CategoriesVMFactory');
const koView = require('./view/knockoutView');
const chartData = require('../../data/mockedChartData');
const categories = categoryVmFactory.createVm(window.data || []);

koView.registerElements(categories, window.data || [], chartData);

// simulate changing chartData
let intervalIndex = 0;
setInterval(() => {
    if (document.body.querySelector('canvas')) {
        chartData.labels.push('NEW_' + intervalIndex++);
        chartData.datasets[0].data.push(Math.floor(Math.random() * 100));
        chartData.datasets[0].backgroundColor.push(`rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)`);
        chartData.datasets[0].borderColor.push(`rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)`);
    }
}, (5000 + Math.floor(Math.random() * 10000)));
