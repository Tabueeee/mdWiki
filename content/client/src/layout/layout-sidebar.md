# G:/dev/01_projects/mdWiki/client/src/layout/layout-sidebar.twig
```js
{% extends 'layout.twig' %}


{% block pageContent %}
    <div class="content-wrap container columns">
        <nav class="column column-left is-one-quarter-desktop is-one-third-tablet">
            <div data-bind="component: 'navSearch', visible: true" class="ko-navSearch" style="display:none;">
                {% include '../component/file-search/file-search-template.html' %}
            </div>

            <div class="ko-nav" data-bind="component: 'nav'">
                {% include '../component/menu/menu-template-basic.twig' with {navigationData: navigationData} only %}
            </div>
        </nav>

        <main class="column">
            <article>
                {% block mainContent %}
                {% endblock mainContent %}
            </article>
        </main>
    </div>
{% endblock pageContent %}
 ```