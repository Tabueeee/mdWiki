var HtmlRenderer = function () {
    var renderPageNav = function (html, navigationData) {
        return html
            .replace('{{nav}}', `
        <div>
            <ul>
                ${dataToLinkList.call(null, navigationData)}
            </ul>
        </div>
        `);
    }

    var renderContent = function (html, pageHtmlContent) {
        return html.replace('{{content}}', pageHtmlContent);
    }

    var dataToLinkList = function dataToLinkList(data) {
        let html = '';
        for (let item of data) {
            html += `<li><a href="${item.url}">${item.filePath}</a></li>`;
        }
        return html;
    }

    return {
        'renderPageNav': renderPageNav,
        'renderContent': renderContent
    };
};

module.exports = HtmlRenderer;
