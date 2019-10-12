# G:/dev/01_projects/mdWiki/client/src/component/nav-menu/nav-menu-template-basic.twig
```twig
<div class="menu box">
    <p class="menu-label">
        Links
    </p>
    <ul class="menu-list">
        {% for item in navigationData %}
            <li>
                <a href="{{ item.url }}" data-bind="click: $root.changePage.bind($root, '{{ item.url }}')">
                    {{ item.filePath }}
                </a>
            </li>
        {% endfor %}
    </ul>
</div>
 ```