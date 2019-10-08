# G:/dev/01_projects/mdWiki/client/src/component/menu/menu-template-basic.twig
```js
<div>
    <ul>
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