import mountComponent from './mountComponent';
import mountNativeElement from './mountNativeElement';
import { isFunction } from './utils';

export default function mountElement (virtualDOM, container, oldDOM, isUnmountOldDOM) {
    if (isFunction(virtualDOM)) {
        // 组件元素
        mountComponent(virtualDOM, container, oldDOM, isUnmountOldDOM)
    } else {
        // 原生元素
        mountNativeElement(virtualDOM, container, oldDOM, isUnmountOldDOM)
    }
}