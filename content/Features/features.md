
# Features
- all pages are usable without js or css
- links can be opened in new tab 

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



- Reads navigation data from folder structure
- Supplies static assets
- injects data into js app
- renders static / simplistic html into {{content}} and {{nav}}  
- allows content only requests with delivering only the body with `?content=1` query present 
- renders markdown to html
- compresses (gzip) assets 
