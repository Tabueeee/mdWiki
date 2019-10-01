# Server
- reads data from directory
- creates data structure
- resolves file / content
- resolves index.html
- injects content
- returns response
- delivers static assets (js)

```typescript

interface Data {
  category: string;
  subcategory: string;
  topic: string;
  filePath: string;
  url: string;   
}

```
