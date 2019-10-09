# G:/dev/01_projects/mdWiki/client/src/component/file-search/file-search-template.html
```js
<h1>test</h1>
<div class="panel">
    <p class="panel-heading">File-Search</p>

    <div class="panel-block">
        <p class="control has-icons-left">
            <input class="input is-small"
                   type="text"
                   placeholder="search something..."
                   data-bind="textInput: searchString">
            <span class="icon is-small is-left">
                <i class="fas fa-search" aria-hidden="true"></i>
            </span>
        </p>
    </div>

    <div data-bind="foreach: filteredItems">
        <a class="panel-block"
           data-bind="click: $root.changePage.bind($root, url), css: {'is-active': $root.currentUrl() == url}">
            <span class="panel-icon">
                <i class="fas fa-book" aria-hidden="true"></i>
            </span>
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