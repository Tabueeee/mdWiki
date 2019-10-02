# G:/dev/01_projects/mdWiki/client/src/script/pageChanger.js
```js
const getRequestOptions = require('../../data/getRequestOptions.json');

module.exports = function (signalLoadingState) {

    window.addEventListener('popstate', (event) => {
        changePage(false, event.target.location.href.replace('http://127.0.0.1:3001', ''));
    });

    let rejectPageChangePromise = () => undefined;

    function changePage(push, link) {
        let contentElement = document.getElementById('content');
        let contentNode = document.createElement('div');
        contentNode.setAttribute('id', 'content-loaded');

        const controller = new AbortController();
        const signal = controller.signal;

        rejectPageChangePromise();
        signalLoadingState(true);
        contentElement.innerHTML = '';
        new Promise(async (resolve, reject) => {
            try {
                rejectPageChangePromise = () => {
                    reject();
                    controller.abort();
                };
                let response = await fetch('http://127.0.0.1:3001' + link + "?content=1", {signal, ...getRequestOptions});
                let text = await response.text();
                resolve({err: false, text});
            } catch (e) {
                console.error(e);
                resolve({err: e});
            }
        }).then((result) => {
            if (result.err) {
                console.log(result.err);
                return;
            }
            contentNode.innerHTML = result.text;
            contentElement.appendChild(contentNode);

            if (push) {
                history.pushState({url: link}, link.substr(link.lastIndexOf('/')), 'http://127.0.0.1:3001' + link);
            }

            window.hljs.initHighlighting.called = false;
            window.hljs.initHighlighting();
            signalLoadingState.bind(contentNode)(false);
        }).catch(() => undefined);


        return false;
    }

    return {changePage};
}
 ```