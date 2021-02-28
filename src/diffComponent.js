import mountElement from './mountElement'
import updateComponent from './updateComponent'
import { isSameComponent } from './utils'

export default function diffComponent (virtualDOM, oldVirtualDOM, oldDOM, container) {
    if (isSameComponent(virtualDOM, oldVirtualDOM)) {
        // 同一个组件，比较 props

        // 类组件拿 component 比较，其他使用 oldVirtualDOM 比较
        const oldComponent = oldVirtualDOM.component || oldVirtualDOM
        // 是否存在属性改变的
        let hasPropsChange = false

        // 检查旧属性都能在新属性上找到相同的
        for (const propName in oldComponent.props) {
            if (oldComponent.props[propName] !== virtualDOM.props[propName]) {
                hasPropsChange = true
                break
            }
        }

        // 如果还是 false，就比较下新旧属性个数是否一致，一致则认为没更新
        if (!hasPropsChange) {
            hasPropsChange = Object.keys(oldComponent.props).length !== Object.keys(virtualDOM.props).length
        }

        // 存在属性变更的就更新组件
        if (hasPropsChange) {
            updateComponent(virtualDOM, oldVirtualDOM, oldDOM, container)
        }
    } else {
        // 不是同一个组件直接渲染，替代掉原来的
        mountElement(virtualDOM, container, oldDOM)
    }
}