# MD-WIKI - Work in progress

## About
Project is mainly about an assertion of [knockouts](https://knockoutjs.com/) capability of creating a [progressively enhanced](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement) web-app
Also it's an working markdown-Wiki. 
            
## Server
basic Server implementation utilizing koa
                                            
## Client
flat component based design system with progressively enhanced modern client-rendered web-app utilizing knockout.js and their valid html-templates

### Using Knockouts valid HTML-Templates for Progressive Enhancement
- Valid html templates
    - No server render required - tags can be rendered without knockout working
    - Add features to elements progressively => Progressive Enhancement friendly
    - Page integration with any tag from anywhere (CMS)
- No deployment for html / css fixes 
- No type safety / autocomplete in HTML-templates (maybe just a missing IDE feature)

[More about knockouts template-usage](client/README.md)

### test-project not (yet) completly progressively enhanced
- CSS is not properly enhanced - Bulma.io is an Flexbox Framework (no-flexbox styles missing)
- ES6+ features used without transpiling - eliminates browser support - for now only for show-casing in modern browsers

## Note:
Run lighthouse against non-code quoting pages in category Features/. The html code in body seems to mess with Lighthouse's algorithms.

- css to small to load async => causes unnecessary repaint
- preloading scripts increases 'Max Potential First Input Delay' but reduces all other metrics and input delay stays below 200ms


## RUN
Start with CLI in project root:

- `npm i`
- `cd client`
- `npm i`
- `npm run all`
- `cd ..`
- `npm start`
- open: [http://127.0.0.1:3001/index.html](http://127.0.0.1:3001/index.html)
