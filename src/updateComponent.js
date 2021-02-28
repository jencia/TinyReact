import diff from './diff'

export default function updateComponent (virtualDOM, oldVirtualDOM, oldDOM, container) {
    const oldComponent = oldVirtualDOM.component

    if (oldComponent) {
        // 类组件
        oldComponent.componentWillReceiveProps(virtualDOM.props)
        if (oldComponent.shouldComponentUpdate(virtualDOM.props)) {
            // 旧的 props
            const prevProps = oldComponent.props

            oldComponent.componentWillUpdate(virtualDOM.props)

            // 更新 props
            oldComponent.updateProps(virtualDOM.props)

            // 获取新的 virtualDOM
            const nextVirtualDOM = oldComponent.render()
    
            // 更新 component
            nextVirtualDOM && (nextVirtualDOM.component = oldComponent)

            // 开始渲染
            diff(nextVirtualDOM, container, oldDOM)

            // 存在 ref 时重新执行
            if (oldComponent.props && typeof oldComponent.props.ref === 'function') {
                oldComponent.props.ref(nextVirtualDOM)
            }
            oldComponent.componentDidUpdate(prevProps)
        }
    } else {
        // 函数式组件
        const nextVirtualDOM = virtualDOM.type(virtualDOM.props)

        diff(nextVirtualDOM, container, oldDOM)
    }
}