# G:/dev/01_projects/mdWiki/client/src/index.html
```js
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="de">

<head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <title>MD-Wiki</title>
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="description" content="Wiki">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="preload" href="/style.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <link rel="preload" href="/bundle.js" as="script">
    <link rel="preload" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.10/highlight.min.js" as="script">

    <noscript>
        <link rel="stylesheet" href="/style.css">
    </noscript>
    <script defer src="/bundle.js"></script>
</head>

<body>
<div class="ko-root">
    <header>
        <div class="header-title-block"><span class="header-title">MD-Wiki</span></div>
        <div class="header-title-block"><span class="header-title">Mock 1</span></div>
        <div class="header-title-block"><span class="header-title">Mock 2</span></div>
        <div class="header-title-block"><span class="header-title">Mock 3</span></div>
        <a class="logo" href="/index.html" data-bind="click: $root.changePage.bind($root, '/index.html')">
            <img src="/lorempixel.jpg" alt="logo">
        </a>
        <div style="clear: both"></div>
    </header>
    <div class="content-wrap">
        <nav>
            <div data-bind="component: 'navSearch', visible: true" class="ko-navSearch" style="display:none;">
                <div class="nav-search-content">
                    <label>
                        <span class="nav-search-title">File-Search</span>
                        <input type="text" data-bind="textInput: searchString" placeholder="search something..." \>
                    </label>
                    <button type="button" data-bind="click: searchString.bind(null, '')">Clear</button>
                    <ul data-bind="foreach: filteredItems">
                        <li>
                            <a data-bind="click: $root.changePage.bind($root, url), text: url.replace('.html', '')"></a>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="ko-nav" data-bind="component: 'nav'">
                {{nav}}
            </div>
        </nav>
        <main>
            <article>
                <div data-bind="visible: $root.isLoading" style="display: none;">
                    <div id="loading"><strong>loading...</strong><span></span></div>
                </div>
                <div id="content">
                    {{content}}
                </div>
            </article>
        </main>

    </div>
</div>
<script>
    window.addEventListener('load', (event) => {
        setTimeout(function () {
            script = document.createElement('script');
            script.src = '//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.10/highlight.min.js';
            script.setAttribute('defer', '');
            script.setAttribute('onload', 'window.hljs.initHighlighting();');
            document.body.appendChild(script);
        }, 0);
    });
</script>

</body>
</html>
 ```