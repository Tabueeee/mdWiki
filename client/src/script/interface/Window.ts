import {RawNavigationDataEntry} from './RawNavigationData';
declare global {
    interface Window {
        hljs: any;
        data: Array<RawNavigationDataEntry>;
    }
}
