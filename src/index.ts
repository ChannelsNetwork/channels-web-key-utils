import { KeyUtils } from './key-utils';
const anyWindow = window as any;
anyWindow.$keyUtils = new KeyUtils();
