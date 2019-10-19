# G:/dev/01_projects/mdWiki/client/src/component/search-results/search-results-template.html
```html
<div class="content" data-bind="visible: $component.isPreLoaded, template: { nodes: $componentTemplateNodes, data: $component }"></div>
<div class="content" data-bind="foreach: searchResults, visible: $component.isPreLoaded() === false">
    <div class="box">
        <p data-bind="text: title"></p>
        <pre data-bind="text: excerpt"></pre>
        <a href="#"
           data-bind="click: function(){$root.changePage(url);$component.visible(false);}, text: url, attr: {href: url}"></a>
    </div>
</div>
 ```