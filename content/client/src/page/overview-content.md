# G:/dev/01_projects/mdWiki/client/src/page/overview-content.twig
```js
<div data-bind="visible: $root.isLoading" style="display: none;">
    <div class="container loading-container">
        <p class="loading-text" style="">
            Loading content...
        </p>
        <progress class="progress is-small is-primary" max="100">15%</progress>
    </div>
</div>
<div class="container">
    <div>
        {% include '../component/menu/menu-template-basic.twig' with {navigationData: navigationData} only %}
    </div>
</div>
 ```