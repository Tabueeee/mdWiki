# G:/dev/01_projects/mdWiki/client/src/component/nav-menu/nav-menu-template.html
```html
<div class="menu box nav-menu">
    <div data-bind="foreach: navItems">
        <p class="menu-label" data-bind="text: name"></p>
        <ul class="menu-list" data-bind="foreach: entries">
            <li>
                <a data-bind="text: name, click: $component.toggle.bind(null, $parent), class: !collapsed ? 'is-active' : ''"></a>
                <ul data-bind="visible: !collapsed, foreach: items">
                    <li>
                        <a data-bind="click: $root.changePage.bind(null, url), attr: {href: url}, text: topic, css: {'is-active': $root.currentUrl() == url}"></a>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</div>
 ```