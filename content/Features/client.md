# Client                

## About
- Project is mainly about an objective assertion of knockouts capability of a progressively enhanced web-app
- CSS is bad and not progressive-enhancement conform
- App has no dedicated architecture
- ES6+ features used without transpiling - eliminates browser support - only test project for show-casing in modern browsers  

## Pro Knockout
- Long-tested project with 1k+ commits, preexisting most other client-render frameworks
- [Great browser support](https://knockoutjs.com/documentation/browser-support.html)
- Detailed [documentation](https://knockoutjs.com/documentation)
- Valid html templates => SEO friendly
    - No server render required - tags can be rendered without knockout working
    - Add features to elements progressively => Progressive Enhancement friendly
    - Page integration with any tag from anywhere (CMS)
- No dynamic update problem due to event based view updates
- Easily extendable with vanillaJS / jquery / ...
- Easy understandable syntax! => html, css dev and designer can edit/understand knockout's HTML-code
- No deployment for html / css fixes 
- Produces a lot less (framework-specific) code!
- Lazy load-able components with custom loaders
- Compatible with state-management like redux with integrated helpers `ko.toJS(viewmodel)`
- Compatible with zero-dependency router [director](https://www.npmjs.com/package/director) (but unnecessary)
    - Apply any changes to dom
    - Run ko.applyBindings
- In theory could create custom loader for react-sub-apps

## Con Knockout
- No type safety / autocomplete in HTML-templates (maybe just a missing IDE feature)
- Not as popular

## Features
- \[Feature] Add Link binding to Header-Logo
    - Example: Fully usable element enhanced with features
- \[Feature] Render navData to navigation (nav.js)
    - Example: Replaces previous "simple" content with dynamic content
- \[Feature] Render search for flat file search of navData (navSearch)
    - Example: use template passed by existing html element
    - Example: is hidden until usable (since dynamic element) 
- \[Feature] Only fetch content on changePage
    - Push new state to history
    - Abort requests on new request during loading
    - Show spinner
- \[Feature] render custom tags in markdown
    - Uses bindings on a link 
    - Binds chartjs to canvas element
    - Fakes updates to chartjs data
- \[SEO] Full dom render without any JS
- \[WPO] FMP without any JS
- \[WPO] FMP 80ms <= FMP <= 120ms
- \[Accessibility] Screen-reader/odd-Devices support -> usable (no-css & no-js)
- < 50 lines of Framework specific code

## FileIndex

### CategoriesVMFactory.js
- converts data to vm data (plain JS)

### knockoutView.js
- convert vm data to vm
- imports and uses `changePange` function
- imports and registers handlers `chart`
- imports and registers components `nav, nav-search`

### chart.js
- exports knockout handler utilizing chart.js

### nav.js
- exports vm of nav

### nav-template.js
- exports template of nav

### navSearch.js
- exports vm of navSearch

### Common

#### getHtml.js
- promise wrapper for fetch

#### pageChanger.js
- injects new content from fetch into dom node
- uses callback to indicate loading state
