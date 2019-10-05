import * as ko from 'knockout';
import {RawNavigationDataEntry} from '../../interface/RawNavigationData';

export class NavSearch {
    private data: Array<RawNavigationDataEntry>;
    public searchString = ko.observable('');
    public filteredItems = ko.computed(function () {
        if (this.searchString() === '') {
            return [];
        }

        return this.data.filter((item) => (item.url.toLowerCase()).includes((this.searchString().toLocaleLowerCase())));
    }, this);

    public constructor(data: Array<RawNavigationDataEntry>) {
        this.data = data;
    }
}
