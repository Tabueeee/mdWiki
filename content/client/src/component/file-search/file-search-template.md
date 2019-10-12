# G:/dev/01_projects/mdWiki/client/src/component/file-search/file-search-template.html
```html
<div class="panel">
    <label for="searchInput" class="panel-heading">File-Search</label>

    <div class="panel-block">
        <p class="control">
            <input class="input is-small"
                   type="text"
                   id="searchInput"
                   placeholder="search something..."
                   data-bind="textInput: searchString">
        </p>
    </div>

    <div data-bind="foreach: filteredNavigationEntries">
        <a class="panel-block"
           data-bind="click: $root.changePage.bind($root, url), css: {'is-active': $root.currentUrl() == url}">
            <span data-bind="text: url.replace('.html', '')"></span>
        </a>
    </div>

    <div class="panel-block">
        <button class="button is-link is-outlined is-fullwidth" data-bind="click: searchString.bind(null, '')">
            reset all filters
        </button>
    </div>
</div>
 ```