const $ = require('zepto');
/**
 * 和传统的JS有点不太一样，多了一些css的require，webpack把所有资源当做JS模块，因此这是推荐的做法。
 */
require('normalize.css');
require('../common/style.less');
require('./style.less');

$('#about').on('click', function () {
    alert('点击了about按钮');
});