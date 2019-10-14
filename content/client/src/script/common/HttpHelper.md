# G:/dev/01_projects/mdWiki/client/src/script/common/HttpHelper.ts
```typescript
export class HttpHelper {
    private readonly getRequestOptions: RequestInit;

    public constructor(getRequestOptions: RequestInit) {
        this.getRequestOptions = getRequestOptions;
    }

    public htmlGet(link: string): { abortFetch: () => void, promise: Promise<string> } {
        const controller = new AbortController();
        const signal = controller.signal;

        let abortFetch: () => void = () => {
            throw new Error('unable to abort');
        };

        let promise: Promise<string> = new Promise(async (resolve, reject) => {
            try {
                abortFetch = () => {
                    reject();
                    controller.abort();
                };
                let response = await fetch(link, {signal, ...this.getRequestOptions});
                resolve(await response.text());
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
}
 ```