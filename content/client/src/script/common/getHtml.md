# G:/dev/01_projects/mdWiki/client/src/script/common/getHtml.ts
```js
// @ts-ignore injected by browserify
const getRequestOptions = require('../../../data/getRequestOptions.json');


export function htmlGet(link: string): { abortFetch: () => void, promise: Promise<{ text: string }> } {
    const controller = new AbortController();
    const signal = controller.signal;
    let abortFetch: () => void = () => {throw new Error('unable to abort');};

    let promise: Promise<{ text: string }> = new Promise(async (resolve, reject) => {
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
            if (!(e instanceof DOMException)) {
                console.error(e);
                reject(e);
            }
        }
    });

    return {abortFetch, promise};
}
 ```