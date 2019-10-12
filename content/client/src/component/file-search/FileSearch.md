# G:/dev/01_projects/mdWiki/client/src/component/file-search/FileSearch.ts
```typescript
import {computed, observable} from 'knockout';
import {FlatNavigationEntry} from '../../script/interface/FlatNavigationEntry';

export class FileSearch {
    private flatNavigationEntries: Array<FlatNavigationEntry>;
    public searchString = observable('');
    public filteredNavigationEntries = computed(() => {
        if (this.searchString() === '') {
            return [];
        }

        return this.flatNavigationEntries.filter((item) => (item.url.toLowerCase()).includes((this.searchString().toLocaleLowerCase())));
    });

    public constructor(flatNavigationEntries: Array<FlatNavigationEntry>) {
        this.flatNavigationEntries = flatNavigationEntries;
    }
}
 ```