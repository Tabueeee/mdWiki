# G:/dev/01_projects/mdWiki/client/src/script/common/getHtml.js
```js
const getRequestOptions = require('../../../data/getRequestOptions.json');

module.exports = function (link) {
    const controller = new AbortController();
    const signal = controller.signal;
    let abortFetch;

    let promise = new Promise(async (resolve, reject) => {
        try {
            abortFetch = () => {
                reject();
                controller.abort();
            };
            let response = await fetch(link, {signal, ...getRequestOptions});
            let text = await response.text();
            resolve({text});
        } catch (e) {
            // Ignore fetch aborts
            if (e instanceof DOMException === false) {
                console.error(e);
                reject(e);
            }
        }
    })

    return {abortFetch, promise};
}
 ```