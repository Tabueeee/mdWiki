import {FlatNavigationEntry} from './FlatNavigationEntry';

declare global {
    interface Window {
        data: Array<FlatNavigationEntry>;
    }
}
