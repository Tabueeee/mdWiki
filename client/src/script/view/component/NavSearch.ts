import {RawNavigationDataEntry} from '../../interface/RawNavigationData';
import {computed, observable} from 'knockout';

export class NavSearch {
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
