import * as ko from 'knockout';
import {ObservableArray} from 'knockout';
import {ViewCategory} from '../../interface/ViewCategory';
import {Subcategory} from '../../interface/NavigationData';

export class Nav {
    public navItems: ObservableArray<ViewCategory>;

    public constructor(categories: Array<ViewCategory>) {
        this.navItems = ko.observableArray<ViewCategory>(categories);
    }

    public toggle(category: ViewCategory, clickedEntry: Subcategory) {
        category.entries.replace(clickedEntry, Object.assign({}, clickedEntry, {collapsed: !clickedEntry.collapsed}));
    }
}
