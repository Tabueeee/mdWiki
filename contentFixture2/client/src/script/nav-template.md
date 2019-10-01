# G:/dev/01_projects/mdWiki/client/src/script/nav-template.html
```js
<div>
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
 ```