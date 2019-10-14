import {observableArray, ObservableArray} from 'knockout';
import {Subcategory, ViewCategory} from '../../script/view/interface/ViewCategory';
import {__assign} from 'tslib';

export class NavMenu {
    public navItems: ObservableArray<ViewCategory>;

    public constructor(categories: Array<ViewCategory>) {
        this.navItems = observableArray<ViewCategory>(categories);
    }

    public toggle(category: ViewCategory, clickedEntry: Subcategory) {
        category.entries.replace(clickedEntry, __assign({}, clickedEntry, {collapsed: !clickedEntry.collapsed}));
    }
}
