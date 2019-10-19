const marked = require('marked');
const renderer = new marked.Renderer();

renderer.requestLink = function (href, title, text) {
    // todo better to match link with navigationData
    let isInternalLink = href.match(/\.md$/);
    let internalLinkHtml = `data-bind="click: $root.changePage.bind(null, '${href}')"`;

    return `<a href="${href}" ${isInternalLink ? internalLinkHtml : ''} title="${title}">${text}</a>`;
}

renderer.image = function (href, title, text) {
    return `<figure class="image"> <img src="${href}" title="${title | ''}" alt="${text | ''}"></figure>`;
}

renderer.heading = function(text, level, raw, slugger) {
    return `<h${level} class="title is-${level}" id="${slugger.slug(raw)}">${text}</h${level}>`;
}

renderer.table = function(header, body) {
    return `<div class="table-container"><table class="table is-striped is-bordered">
<thead>${header}</thead>
<tbody>${body}</tbody>
</table></div>`;
}


module.exports.renderer = renderer;
