export default function unmountNode (node) {
    const virtualDOM = node._virtualDOM
    
    // 文本节点直接删除
    if (virtualDOM.type === 'text') {
        node.remove()
        return
    }
    
    // 类组件时调用卸载生命周期
    if (virtualDOM.component) {
        virtualDOM.component.componentWillUnmount()
    }

    // 存在 ref 时置空
    if (virtualDOM.props && typeof virtualDOM.props.ref === 'function') {
        virtualDOM.props.ref(null)
    }

    // 有绑定事件时移除事件
    Object.keys(virtualDOM.props).forEach(propName => {
        if (propName.slice(0, 2) === 'on') {
            const eventName = propName.toLowerCase().slice(2)
            const eventHandler = virtualDOM.props[propName]

            node.removeEventListener(eventName, eventHandler)
        }
    })
    
    // 递归卸载子节点
    const childNodes = node.childNodes
    for (let i = 0; i < childNodes.length - 1;) {
        unmountNode(childNodes[i])
    }

    // 删除节点
    node.remove()
}