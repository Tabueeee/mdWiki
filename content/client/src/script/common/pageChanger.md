# G:/dev/01_projects/mdWiki/client/src/script/common/pageChanger.ts
```js
import {htmlGet} from './getHtml';

export class PageChanger {

    private signalLoadingState: (loadingState: boolean) => void;

    public constructor(signalLoadingState: (loadingState: boolean) => void) {
        this.signalLoadingState = signalLoadingState;
        window.addEventListener('popstate', (event: PopStateEvent) => {
            // @ts-ignore typings wrong? or chrome only?
            this.changePage(false, event.target.location.href.replace('http://127.0.0.1:3001', ''));
        });
    }

    public changePage(push: boolean, link: string) {
        let contentElement: HTMLElement = (<HTMLElement>document.getElementById('content'));
        let contentNode = document.createElement('div');

        this.abortFetch();
        this.signalLoadingState(true);
        contentElement.innerHTML = '';

        let getHandler = htmlGet('http://127.0.0.1:3001' + link + '?content=1');
        this.abortFetch = getHandler.abortFetch;
        getHandler
            .promise
            .then((result: { text: string }) => {
                contentNode.innerHTML = result.text;
                contentNode.setAttribute('id', 'content-loaded');
                contentElement.appendChild(contentNode);

                if (push) {
                    history.pushState({url: link}, link.substr(link.lastIndexOf('/')), 'http://127.0.0.1:3001' + link);
                }

                window.hljs.initHighlighting.called = false;
                window.hljs.initHighlighting();
                this.signalLoadingState(false);
            })
            // todo handle failed fetch (server unavailable)
            .catch(() => undefined);

    }

    private abortFetch: () => void = () => undefined;
}
 ```