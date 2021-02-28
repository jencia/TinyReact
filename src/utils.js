
// 元素类型是否是函数
export function isFunction (virtualDOM) {
    return virtualDOM && virtualDOM.type && typeof virtualDOM.type === 'function'
}

// 是否是函数式组件
export function isFunctionElement (virtualDOM) {
    if (!isFunction(virtualDOM)) {
        return false
    }
    return !(virtualDOM.type.prototype && virtualDOM.type.prototype.render)
}

// 是否是同一个组件
export function isSameComponent (virtualDOM, oldVirtualDOM) {
    if (!isFunction(virtualDOM)) return false
    if (oldVirtualDOM.functionComponent) {
        // 函数式组件
        return virtualDOM.type === oldVirtualDOM.functionComponent
    }
    if (oldVirtualDOM.component) {
        // 类组件
        return virtualDOM.type === oldVirtualDOM.component.constructor
    }
    return false
}