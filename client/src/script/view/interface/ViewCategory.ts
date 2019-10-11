import {Observable, ObservableArray} from 'knockout';

export interface ViewCategory {
    name: string;
    entries: ObservableArray<Subcategory>;
}

export interface Subcategory {
    name: string;
    items: any;
    collapsed: Observable<boolean>;
}
