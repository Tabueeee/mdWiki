# G:/dev/01_projects/mdWiki/client/src/style.scss
```js
.content-wrap {
  display: flex;
}

.ko-nav ul {
  padding: 0;
}

.header-title {
  color: white;
  display: block;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
}

.header-title-block {
  width: 100px;
  height: 100px;
  float: left;
  background-color: #27749b;
  margin-right: 5px;
}

header {
  display: block;
  width: 100%;
  background-color: #214364;
  padding: 10px;
}

header .logo {
  float: right;
}

main {
  width: 100%;
  border-right: 1px solid black;
}

nav {
  max-width: 500px;
  min-width: 250px;
}

#content {
  flex-grow: 1;
  padding: 0 20px;
}

* {
  box-sizing: border-box;
}

nav li {
  list-style: none;
  background-color: #27749b;
  transition: background-color .33s;
  border-bottom: 1px solid #27749b;
}

nav li:hover {
  background-color: #214364;
  border-bottom: 1px solid white;
}


nav a {
  display: block;
  padding: 10px;
  font-weight: bold;
  text-decoration: none;
  color: white;
  word-break: break-all;
  cursor: pointer;
}

.nav-search-title {
  color: white;
}

.nav-category,
.nav-search-title,
.nav-subcategory {
  display: block;
  font-size: 16px;
  font-weight: bold;
}

.sub-category {
  background-color: #214364;
  color: white;
  cursor: pointer;
  margin-top: 0.25em;
  padding: 10px;
}

.sub-category h2 {
  margin: 0;
  word-break: break-all;
}

.category {
  background-color: #f0f0f0;
  padding: 10px;
}

.nav-search {
  background-color: #f0f0f0;
  padding: 10px;
}

.nav-search-content {
  padding: 20px;
  background-color: #214364;
}

button {
  background-color: #27749b;
  border: none;
  padding: 10px;
  color: white;
  transition: border .33s;
  border-bottom: 1px solid #27749b;
  cursor: pointer;
}

button:hover {
  border-bottom: 1px solid white;
}

input[type="text"] {
  padding: 10px;
}

.nav-search-content input {
  width: 70%;
  height: 40px;
}

.nav-search-content button {
  width: 27%;
  height: 40px;
}

.nav-search ul {
  padding: 0;
}

/*

Google Code style (c) Aahan Krish <geekpanth3r@gmail.com>

*/

.hljs {
  display: block;
  overflow-x: auto;
  padding: 0.5em;
  background: white;
  color: black;
}

.hljs-comment,
.hljs-quote {
  color: #800;
}

.hljs-keyword,
.hljs-selector-tag,
.hljs-section,
.hljs-title,
.hljs-name {
  color: #008;
}

.hljs-variable,
.hljs-template-variable {
  color: #660;
}

.hljs-string,
.hljs-selector-attr,
.hljs-selector-pseudo,
.hljs-regexp {
  color: #080;
}

.hljs-literal,
.hljs-symbol,
.hljs-bullet,
.hljs-meta,
.hljs-number,
.hljs-link {
  color: #066;
}

.hljs-title,
.hljs-doctag,
.hljs-type,
.hljs-attr,
.hljs-built_in,
.hljs-builtin-name,
.hljs-params {
  color: #606;
}

.hljs-attribute,
.hljs-subst {
  color: #000;
}

.hljs-formula {
  background-color: #eee;
  font-style: italic;
}

.hljs-selector-id,
.hljs-selector-class {
  color: #9B703F
}

.hljs-addition {
  background-color: #baeeba;
}

.hljs-deletion {
  background-color: #ffc8bd;
}

.hljs-doctag,
.hljs-strong {
  font-weight: bold;
}

.hljs-emphasis {
  font-style: italic;
}
 ```