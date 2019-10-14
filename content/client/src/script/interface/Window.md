# G:/dev/01_projects/mdWiki/client/src/script/interface/Window.ts
```typescript
import {FlatNavigationEntry} from './FlatNavigationEntry';

declare global {
    interface Window {
        serverData: { assetUID: string, flatNavigationEntries: Array<FlatNavigationEntry> };
    }
}
 ```