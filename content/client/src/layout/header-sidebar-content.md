# G:/dev/01_projects/mdWiki/client/src/layout/header-sidebar-content.twig
```twig
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="de">

<head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <title>MD-Wiki</title>
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="description" content="Wiki">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="/style{{ assetUID }}.css">
    <link rel="preload" href="/bundle{{ assetUID }}.js" as="script">
    <script defer src="/bundle{{ assetUID }}.js"></script>
    <link rel="preload" href="/highlight.js" as="script">
    <link rel="preload" href="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.bundle.min.js" as="script">

    <template id="nav-menu-template">
        {% include '../component/nav-menu/nav-menu-template.html' %}
    </template>
</head>

<body>
<header class="navbar is-primary" role="navigation" aria-label="main navigation">
    {% include '../component/header/header-template.html' %}
</header>
<div class="content-wrap container columns">
    <nav class="column column-left is-one-quarter-desktop is-one-third-tablet">
        <file-search data-bind="visible: true" style="display:none;">
            {% include '../component/file-search/file-search-template.html' %}
        </file-search>

        <nav-menu>
            {% include '../component/nav-menu/nav-menu-template-basic.twig' with {navigationData: navigationData} only %}
        </nav-menu>
    </nav>

    <main class="column">
        {% include '../component/loading-indicator/loading-indicator-template.html' %}
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
</body>
</html>
 ```