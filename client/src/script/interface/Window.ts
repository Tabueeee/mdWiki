import {FlatNavigationEntry} from './FlatNavigationEntry';

declare global {
    interface Window {
        serverData: { assetUID: string, flatNavigationEntries: Array<FlatNavigationEntry> };
    }
}
