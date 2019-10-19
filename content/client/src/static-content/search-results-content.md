# G:/dev/01_projects/mdWiki/client/src/static-content/search-results-content.twig
```twig
<div class="container">
    <div>
        {% include '../component/search-results/search-results-template-basic.twig' with {searchResults: searchResults} only %}
    </div>
</div>
 ```