# Client

## Features
- render navData to navigation
- render search for flat file search of navData
- only fetch content on changePage
    - push new state to history
    - abort requests on new request during loading
    - show spinner
- \[SEO] full dom render without any JS
- \[WPO] FMP without any JS
- \[Accessibility] screen-reader support -> usable (no-css & no-js)
- < 50 lines of Framework specific code


## VMFactory.js
- converts data to vm data (plain JS)

## knockoutView.js
- convert vm data to vm
- create components nav, nav-search
- displays list expandable on categories (default: collapsed)
- links in list load body with param ?content=1 to inject only the new content
- search filters plain vm data list and shows filtered list on value in input  


{name: key, entries: subCategories}


subcategories:
{name: subCategoryKey, items: subCategoryMap[subCategoryKey], collapsed: true}

---
<a href="#" data-bind="click: $root.changePage.bind($root, '/client/src/script/nav-template.html')">test-link2</a>
