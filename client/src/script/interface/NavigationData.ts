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
