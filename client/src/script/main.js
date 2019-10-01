const vmFactory = require('./VMFactory');
const koView = require('./knockoutView');
// const hljs = require('highlight.js');

const categories = vmFactory.createVm(window.data);
koView.registerElements(categories, window.data);
// hljs.initHighlightingOnLoad();
