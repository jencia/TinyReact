import mountElement from './mountElement'
import updateNodeElement from './updateNodeElement'

export default function createDOMElement (virtualDOM) {
    let newElement = null

    // 组件元素有可能会创建出 null 的 VirtualDOM 对象
    if (!virtualDOM) {
        return null
    }
    // 文本元素
    if (virtualDOM.type === 'text') {
        newElement = document.createTextNode(virtualDOM.props.textContent)
    } else {
        newElement = document.createElement(virtualDOM.type)
        updateNodeElement(newElement, virtualDOM)
    }

    // 将当前 VirtualDOM 对象存储到 DOM 元素对象上
    newElement._virtualDOM = virtualDOM;

    // 递归渲染子元素
    (virtualDOM.children || []).forEach(child => {
        mountElement(child, newElement)
    })

    // 存在 ref 时执行 ref 方法
    if (virtualDOM.props && typeof virtualDOM.props.ref === 'function') {
        virtualDOM.props.ref(newElement)
    }


    return newElement
}