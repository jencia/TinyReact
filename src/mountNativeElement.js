import createDOMElement from './createDOMElement';
import unmountNode from './unmountNode';

export default function mountNativeElement (virtualDOM, container, oldDOM, isUnmountOldDOM = true) {
    const newElement = createDOMElement(virtualDOM)

    if (!newElement) return
    
    // 存在 oldDOM 时位置放在 oldDOM 的位置
    if (oldDOM) {
        container.insertBefore(newElement, oldDOM)
    } else {   
        container.appendChild(newElement)
    }

    // 每次渲染元素元素时都要删除旧元素 
    if (oldDOM && isUnmountOldDOM) {
        unmountNode(oldDOM)
    }

    // 如果存在 component ，意味着这是类组件进来的，需要传递 DOM 给组件实例
    if (virtualDOM.component) {
        virtualDOM.component.setDOM(newElement)
    }
}