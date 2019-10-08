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

    <template id="nav-template">
        {% include '../component/menu/menu-template.html' %}
    </template>
</head>

<body>
<div class="ko-root">
    <header class="navbar is-primary" role="navigation" aria-label="main navigation">
        {% include '../component/header/header-template.html' %}
    </header>

    {% block pageContent %}
    {% endblock pageContent %}
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