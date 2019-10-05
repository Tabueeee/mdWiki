import {ObservableArray} from 'knockout';
import {Subcategory} from './NavigationData';

export interface ViewCategory {
    name: string;
    entries: ObservableArray<Subcategory>;
}
