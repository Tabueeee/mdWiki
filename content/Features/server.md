# Server

## About
- Project is mainly about an objective assertion of knockouts capability of a progressively enhanced web-app
- basic Server implementation utilizing koa

## Features
- Reads navigation data from folder structure
- Supplies static assets
- injects data into js app
- renders static / simplistic html into {{content}} and {{nav}}  
- allows content only requests with delivering only the body with `?content=1` query present 
- renders markdown to html
- compresses (gzip) assets 

## FileIndex

### koaServer.js
- main http server

### NavDataFactory.js
- minimalistic navigation data builder from md file structure

### HtmlRenderer.js
- minimalistic static renderer
- probably exchanged with full templating language like twig, handlebars, etc.
