# G:/dev/01_projects/mdWiki/client/src/component/file-search/FileSearch.ts
```js
import {computed, observable} from 'knockout';
import {FlatNavigationEntry} from '../../script/interface/FlatNavigationEntry';

export class FileSearch {
    private data: Array<FlatNavigationEntry>;
    public searchString = observable('');
    public filteredItems = computed(() => {
        if (this.searchString() === '') {
            return [];
        }

        return this.data.filter((item) => (item.url.toLowerCase()).includes((this.searchString().toLocaleLowerCase())));
    });

    public constructor(data: Array<FlatNavigationEntry>) {
        this.data = data;
    }
}
 ```