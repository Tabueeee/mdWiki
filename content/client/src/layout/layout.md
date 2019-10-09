# G:/dev/01_projects/mdWiki/client/src/layout/layout.twig
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

    <template id="nav-menu-template">
        {% include '../component/nav-menu/menu-template.html' %}
    </template>
</head>

<body>
<div class="ko-root">
    <header class="navbar is-primary" role="navigation" aria-label="main navigation">
        {% include '../component/header/header-template.html' %}
    </header>
    <div class="content-wrap container columns">
        <nav class="column column-left is-one-quarter-desktop is-one-third-tablet">
            <file-search data-bind="visible: true" style="display:none;">
                {% include '../component/file-search/file-search-template.html' %}
            </file-search>

            <nav-menu>
                {% include '../component/nav-menu/menu-template-basic.twig' with {navigationData: navigationData} only %}
            </nav-menu>
        </nav>

        <main class="column">
            <div data-bind="visible: $root.isLoading" style="display: none;">
                <div class="container loading-container">
                    <p class="loading-text" style="">
                        Loading content...
                    </p>
                    <progress class="progress is-small is-primary" max="100">15%</progress>
                </div>
            </div>
            <article>
                <div id="content">
                    <div class="content content-loaded">
                        {% block mainContent %}
                        {% endblock mainContent %}
                    </div>
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