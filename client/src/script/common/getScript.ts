
export function getScript(link: string, key: string) {
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
