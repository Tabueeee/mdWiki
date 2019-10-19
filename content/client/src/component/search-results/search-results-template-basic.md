# G:/dev/01_projects/mdWiki/client/src/component/search-results/search-results-template-basic.twig
```twig
<search-results>
    {% for searchResult in searchResults %}
        <div class="box">
            <p>{{ searchResult.title }}</p>
            <pre>{{ searchResult.excerpt }}</pre>
            <a href="{{ searchResult.url }}"
               data-bind="click: $root.changePage.bind(null, '{{ searchResult.url }}');">{{ searchResult.url }}</a>
        </div>
    {% endfor %}
</search-results>
 ```