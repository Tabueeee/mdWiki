import {computed, observable} from 'knockout';
import {RawNavigationDataEntry} from '../../script/interface/RawNavigationData';

export class FileSearch {
    private data: Array<RawNavigationDataEntry>;
    public searchString = observable('');
    public filteredItems = computed(function () {
        if (this.searchString() === '') {
            return [];
        }

        return this.data.filter((item) => (item.url.toLowerCase()).includes((this.searchString().toLocaleLowerCase())));
    }, this);

    public constructor(data: Array<RawNavigationDataEntry>) {
        this.data = data;
    }
}
