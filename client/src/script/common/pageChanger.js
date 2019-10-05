const GET = require('./getHtml');

module.exports = function (signalLoadingState) {

    window.addEventListener('popstate', (event) => {
        changePage(false, event.target.location.href.replace('http://127.0.0.1:3001', ''));
    });

    let abortFetch = () => undefined;

    function changePage(push, link) {
        let contentElement = document.getElementById('content');
        let contentNode = document.createElement('div');

        abortFetch();
        signalLoadingState(true);
        contentElement.innerHTML = '';

        let getHandler = GET('http://127.0.0.1:3001' + link + "?content=1");
        abortFetch = getHandler.abortFetch;
        getHandler
            .promise
            .then((result) => {
                contentNode.innerHTML = result.text;
                contentNode.setAttribute('id', 'content-loaded');
                contentElement.appendChild(contentNode);

                if (push) {
                    history.pushState({url: link}, link.substr(link.lastIndexOf('/')), 'http://127.0.0.1:3001' + link);
                }

                window.hljs.initHighlighting.called = false;
                window.hljs.initHighlighting();
                signalLoadingState(false);
            })
            // todo handle failed fetch (server unavailable)
            .catch(() => undefined);
    }

    return {changePage};
}
