# G:/dev/01_projects/mdWiki/client/src/component/theme-selector/ThemeSelector.ts
```typescript
import {observable} from 'knockout';
import {Actions} from '../../script/Actions';

export class ThemeSelector {

    public activeTheme = observable('light');
    private readonly srcMap = {
        'light': '/bulma.min.css',
        'dark': '/darkly.min.css'
    };

    public constructor(actions: Actions) {
        this.activeTheme.subscribe((newThemeValue: string) => {
            actions.loadStyle(this.srcMap[newThemeValue]);
        });
    }
}
 ```