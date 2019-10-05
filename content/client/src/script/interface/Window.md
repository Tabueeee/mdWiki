# G:/dev/01_projects/mdWiki/client/src/script/interface/Window.ts
```js
import {RawNavigationDataEntry} from './RawNavigationData';
declare global {
    interface Window {
        hljs: any;
        data: Array<RawNavigationDataEntry>;
    }
}
 ```