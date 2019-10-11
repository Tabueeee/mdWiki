# G:/dev/01_projects/mdWiki/client/src/component/nav-menu/NavMenu.ts
```js
import {observableArray, ObservableArray} from 'knockout';
import {ViewCategory} from '../../script/interface/ViewCategory';
import {Subcategory} from '../../script/interface/NavigationData';

export class NavMenu {
    public navItems: ObservableArray<ViewCategory>;

    public constructor(categories: Array<ViewCategory>) {
        this.navItems = observableArray<ViewCategory>(categories);
    }

    public toggle(category: ViewCategory, clickedEntry: Subcategory) {
        category.entries.replace(clickedEntry, Object.assign({}, clickedEntry, {collapsed: !clickedEntry.collapsed}));
    }
}
 ```