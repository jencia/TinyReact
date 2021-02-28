export default function updateNodeElement (newElement, virtualDOM, oldVirtualDOM = {}) {
    const newProps = virtualDOM.props || {}
    const oldProps = oldVirtualDOM.props || {}

    Object.keys(newProps).forEach(propName => {
        const newPropValue = newProps[propName]
        const oldPropValue = oldProps[propName]

        // 新旧值相同的不做任何处理
        if (newPropValue === oldPropValue) {
            return
        }
        if (propName.slice(0, 2) === 'on') {
            const eventName = propName.toLowerCase().slice(2)

            newElement.addEventListener(eventName, newPropValue)

            // 存在旧事件的移除掉
            if (oldPropValue) {
                newElement.removeEventListener(eventName, oldPropValue)
            }
        } else if (['value', 'checked', 'style'].includes(propName)) {
            if (propName === 'style' && typeof newPropValue === 'object') {
                // 先删除旧值
                if (oldPropValue) {
                    newElement.style = {}
                }
                Object.keys(newPropValue).forEach(key => {
                    newElement.style[key] = newPropValue[key]
                })
            } else {
                newElement[propName] = newPropValue
            }
        } else if (propName !== 'children') {
            if (propName === 'className') {
                newElement.setAttribute('class', newPropValue)
            } else {
                newElement.setAttribute(propName, newPropValue)
            }
        }
    })

    // 如果 oldProps 存在的，但 newProps 不存在，表示被删除
    Object.keys(oldProps).forEach(propName => {
        const newPropValue = newProps[propName]
        const oldPropValue = oldProps[propName]

        // 存在新值的不做处理，上面已经处理了
        if (newPropValue) {
            return;
        }
        if (propName.slice(0, 2) === 'on') {
            const eventName = propName.toLowerCase().slice(2)

            newElement.removeEventListener(eventName, oldPropValue)
        } else if (propName !== 'children') {
            if (propName === 'className') {
                newElement.removeAttribute('class')
            } else {
                newElement.removeAttribute(propName)
            }
        }
    })

    newElement._virtualDOM = virtualDOM
}