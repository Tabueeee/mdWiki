# G:/dev/01_projects/mdWiki/client/src/script/Actions.ts
```typescript
import {PageChanger} from './common/PageChanger';
import {HttpHelper} from './common/HttpHelper';

export class Actions {
    private pageChanger: PageChanger;
    private httpHelper: HttpHelper;


    public constructor(pageChanger: PageChanger, httpHelper: HttpHelper) {
        this.pageChanger = pageChanger;
        this.httpHelper = httpHelper;
    }

    public getSearchResults(searchQuery: string) {
        this.abortSearchFetch();
        let handler = this.httpHelper.htmlGet('/search?q=' + searchQuery);
        this.abortSearchFetch = handler.abortFetch;
        return handler
            .promise
            .then((result: any) => {
                let parsedResult = [];
                try {
                    parsedResult = JSON.parse(result);
                } catch (e) {
                }

                return parsedResult;
            });
    }

    public changePageContent(url: string) {
        // global bindings
        this.pageChanger.changePage(true, url);
    }

    public loadStyle(url: string) {
        // theme-selector
        let styleElement = document.createElement('link');
        styleElement.setAttribute('href', url);
        styleElement.setAttribute('rel', 'stylesheet');
        styleElement.setAttribute('type', 'text/css');
        document.head.appendChild(styleElement);
    }

    private abortSearchFetch: () => void = () => undefined;
}
 ```