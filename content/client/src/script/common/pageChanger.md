# G:/dev/01_projects/mdWiki/client/src/script/common/PageChanger.ts
```typescript
import {HttpHelper} from './HttpHelper';
import {PageState} from '../interface/PageState';

export class PageChanger {

    private loadingStateChangeSubscribers: Array<(state: PageState) => void> = [];
    private httpHelper: HttpHelper;

    public constructor(httpHelper: HttpHelper) {
        this.httpHelper = httpHelper;
        window.addEventListener('popstate', (event: PopStateEvent) => {
            // @ts-ignore typings wrong? or chrome only?
            this.changePage(false, event.target.location.href);
        });
    }

    public subscribeLoadingStateChange(cb: (state: PageState) => void) {
        this.loadingStateChangeSubscribers.push(cb);
    }

    public changePage(push: boolean, link: string) {
        this.abortFetch();
        this.broadcastLoadingStateChange({isLoading: true, requestLink: link});


        let getHandler = this.httpHelper.htmlGet(link + (link.indexOf('?') > - 1 ? '&' : '?') + 'content=1');
        this.abortFetch = getHandler.abortFetch;
        getHandler
            .promise
            .then((text: string) => {
                if (push) {
                    history.pushState({url: link}, link.substr(link.lastIndexOf('/')), link);
                }

                this.broadcastLoadingStateChange({isLoading: false, successful: true, response: text, requestLink: link});
            })
            // handle failed fetch (server unavailable)
            .catch((e) => {
                this.broadcastLoadingStateChange({isLoading: false, successful: false, requestLink: link, response: e.toString()});
            });
    }

    private broadcastLoadingStateChange(state: PageState) {
        for (let cb of this.loadingStateChangeSubscribers) {
            cb(state);
        }
    }

    private abortFetch: () => void = () => undefined;
}
 ```