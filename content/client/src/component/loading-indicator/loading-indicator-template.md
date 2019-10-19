# G:/dev/01_projects/mdWiki/client/src/component/loading-indicator/loading-indicator-template.html
```html
<div class="loading-indicator" data-bind="visible: $parent.isLoading" style="display: none;">
    <div class="container loading-container">
        <p class="loading-text" style="">
            Loading content...
        </p>
        <progress class="progress is-small is-primary" max="100">15%</progress>
    </div>
</div>
 ```