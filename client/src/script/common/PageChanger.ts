import {HttpHelper} from './HttpHelper';

export class PageChanger {

    private loadingStateChangeSubscribers: Array<(loadingState: boolean) => void> = [];
    private httpHelper: HttpHelper;

    public constructor(httpHelper: HttpHelper) {
        this.httpHelper = httpHelper;
        window.addEventListener('popstate', (event: PopStateEvent) => {
            // @ts-ignore typings wrong? or chrome only?
            this.changePage(false, event.target.location.href.replace('http://127.0.0.1:3001', ''));
        });
    }

    public subscribeLoadingStateChange(cb: (loadingState: boolean) => void) {
        this.loadingStateChangeSubscribers.push(cb);
    }

    public changePage(push: boolean, link: string) {
        let contentElement: HTMLElement = (<HTMLElement>document.getElementById('content'));
        let contentNode = document.createElement('div');

        this.abortFetch();
        this.broadcastLoadingStateChange(true);
        contentElement.innerHTML = '';

        let getHandler = this.httpHelper.htmlGet('http://127.0.0.1:3001' + link + '?content=1');
        this.abortFetch = getHandler.abortFetch;
        getHandler
            .promise
            .then((text: string) => {
                contentNode.innerHTML = text;
                contentNode.setAttribute('id', 'content-loaded');
                contentNode.setAttribute('class', 'content');
                contentElement.appendChild(contentNode);

                if (push) {
                    history.pushState({url: link}, link.substr(link.lastIndexOf('/')), 'http://127.0.0.1:3001' + link);
                }

                this.broadcastLoadingStateChange(false);
            })
            // todo handle failed fetch (server unavailable)
            .catch(() => undefined);
    }

    private broadcastLoadingStateChange(state: boolean) {
        for (let cb of this.loadingStateChangeSubscribers) {
            cb(state);
        }
    }

    private abortFetch: () => void = () => undefined;
}
