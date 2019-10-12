# G:/dev/01_projects/mdWiki/client/src/script/interface/Window.ts
```js
import {FlatNavigationEntry} from './FlatNavigationEntry';

declare global {
    interface Window {
        data: Array<FlatNavigationEntry>;
    }
}
 ```