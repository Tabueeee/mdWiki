export function getScript<T>(link: string, key: string): Promise<T> {
    let scriptElement = document.createElement('script');
    scriptElement.src = link;
    scriptElement.setAttribute('defer', '');
    document.body.appendChild(scriptElement);

    return new Promise((resolve) => {
        scriptElement
            .addEventListener('load', function () {
                resolve(window[key]);
            });
    });
}
