# G:/dev/01_projects/mdWiki/client/src/script/interface/Window.ts
```js
import {FlatNavigationEntryList} from './FlatNavigationEntryList';
declare global {
    interface Window {
        hljs: any;
        data: Array<FlatNavigationEntryList>;
        registerChartJS: (chartJS: any) => void;
    }
}
 ```