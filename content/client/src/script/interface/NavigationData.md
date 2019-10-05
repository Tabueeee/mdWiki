# G:/dev/01_projects/mdWiki/client/src/script/interface/NavigationData.ts
```js
export type NavigationData = Array<Category>;

export interface Category {
    name: string;
    entries: Array<Subcategory>;
}

export interface Subcategory {
    name: string;
    items: any;
    collapsed: boolean;
}
 ```