# G:/dev/01_projects/mdWiki/client/src/component/header/header-template.twig
```twig
<div class="navbar-brand header">
    <a class="navbar-item level-item" href="/index.html"
       data-bind="click: $root.changePage.bind(null, '/index.html')">
        <img src="/lorempixel.jpg" alt="logo" width="112" height="28">
    </a>
</div>
<div class="navbar-menu">
    <div class="navbar-end">
        <div class="navbar-item">
            <label for="content-search-input"><p>content search:</p></label>
        </div>
        <div class="navbar-item">
            <search-input>
                {% include '../search-input/search-input-template.html' %}
            </search-input>
        </div>
        <div class="navbar-item">
            <theme-selector></theme-selector>
        </div>
    </div>
</div>
 ```