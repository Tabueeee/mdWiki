# G:/app/wiki2/client/src/index.html
```js
<html xmlns="http://www.w3.org/1999/xhtml" lang="de">

<head>
    <title>My-Wiki</title>
    <link href="build/style.css" rel="stylesheet">
<!--    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.10/styles/default.min.css">-->
</head>

<body>
<div class="ko-root content-wrap">
    <nav>
        <div data-bind="component: 'navSearch'" class="ko-search">
            <div class="nav-search-content">
                <input type="text" data-bind="textInput: searchString" placeholder="search something..." \>
                <button type="button" data-bind="click: searchString('')">Clear</button>
                <ul data-bind="foreach: filteredItems">
                    <li><a data-bind="click: $root.changePage.bind($root, url), text: category+'/'+subcategory+'/'+topic"></a></li>
                </ul>
            </div>
        </div>

        <div class="ko-nav" data-bind="component: 'nav'">
            <div data-bind="foreach: navItems">
                <div class="category">
                    <h1 data-bind="text: name"></h1>
                    <div data-bind="foreach: entries">
                        <div class="sub-category">
                            <h2 data-bind="text: 'SC: '+name, click: $component.toggle.bind($component, $parent)"></h2>

                            <div data-bind="visible: !collapsed">
                                <ul data-bind="foreach: items">
                                    <li><a data-bind="click: $root.changePage.bind($root, url), text: topic"></a></li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </nav>
    <main>
        <article>
            <div id="content">
                {{content}}
            </div>
        </article>
    </main>
</div>
<script src="/bundle.js"></script>
<script async src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.10/highlight.min.js" onload="hljs.initHighlightingOnLoad();"></script>
</body>
</html>
 ```