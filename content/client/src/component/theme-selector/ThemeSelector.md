# G:/dev/01_projects/mdWiki/client/src/component/theme-selector/ThemeSelector.ts
```typescript
import {observable} from 'knockout';

export class ThemeSelector {

    public activeTheme = observable('light');
    private readonly srcMap = {
        'light': '/style' + window.serverData.assetUID + '.css',
        'dark': '/darkly.min.css'
    };

    public constructor() {
        this.activeTheme.subscribe((newThemeValue: string) => {
            let styleElement = document.createElement('link');
            styleElement.setAttribute('href', this.srcMap[newThemeValue]);
            styleElement.setAttribute('rel', 'stylesheet');
            styleElement.setAttribute('type', 'text/css');
            document.head.appendChild(styleElement);
        });
    }
}
 ```