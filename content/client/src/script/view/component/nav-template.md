# G:/dev/01_projects/mdWiki/client/src/script/view/component/nav-template.html
```js
<div>
    <div data-bind="foreach: navItems">
        <div class="category">
            <span class="nav-category" data-bind="text: name"></span>
            <div data-bind="foreach: entries">
                <div class="sub-category">
                    <span class="nav-subcategory"
                          data-bind="text: name, click: $component.toggle.bind($component, $parent)"></span>
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