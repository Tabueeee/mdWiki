# G:/dev/01_projects/mdWiki/client/src/script/interface/ViewCategory.ts
```js
import {ObservableArray} from 'knockout';
import {Subcategory} from './NavigationData';

export interface ViewCategory {
    name: string;
    entries: ObservableArray<Subcategory>;
}
 ```