import {Observable, observable, observableArray, ObservableArray} from 'knockout';
import {Actions} from '../../script/Actions';

export class SearchPopup {
    public searchString: Observable<string>;
    public searchResults: ObservableArray<any> = observableArray<any>([]);
    public visible = observable(false);
    public isLoading = observable(false);
    public hasFocus = observable(false);
    public isPreLoaded: Observable<boolean>;

    public constructor(actions: Actions, searchString: string) {
        this.searchString = observable(searchString);
        this.searchString.extend({rateLimit: {timeout: 300, method: 'notifyWhenChangesStop'}});

        if (window.location.pathname === '/searchResult.html') {
            this.isPreLoaded = observable(true);
        } else {
            this.isPreLoaded = observable(false);
        }

        this.searchString.subscribe((newVal: string) => {
            this.isPreLoaded(false);

            if (window.location.pathname !== '/searchResult.html') {
                this.visible(true);
            }

            if (newVal.length >= 3) {
                this.searchResults([]);
                this.isLoading(true);
                actions.getSearchResults(newVal)
                       .then((result: any) => {
                           this.searchResults(result);
                           this.isLoading(false);
                       });
            }
        });
    }
}
