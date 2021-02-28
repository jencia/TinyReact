import mountElement from './mountElement';
import { isFunctionElement } from './utils';

export default function mountComponent (virtualDOM, container, oldDOM, isUnmountOldDOM) {
    let nextVirtualDOM = null
    let component = null

    if (isFunctionElement(virtualDOM)) {
        // 函数式组件
        nextVirtualDOM = buildFunctionComponent(virtualDOM)
    } else {
        // 类组件
        nextVirtualDOM = buildClassComponent(virtualDOM)
        nextVirtualDOM && (component = nextVirtualDOM.component)
    }
    component && component.componentWillMount()

    mountElement(nextVirtualDOM, container, oldDOM, isUnmountOldDOM)

    if (component) {
        if (component.props && typeof component.props.ref === 'function') {
            component.props.ref(nextVirtualDOM)
        }
        component.componentDidMount()
    }
}

function buildFunctionComponent (virtualDOM) {
    const nextVirtualDOM = virtualDOM.type(virtualDOM.props)

    nextVirtualDOM && (nextVirtualDOM.functionComponent = virtualDOM.type)
    return nextVirtualDOM
}

function buildClassComponent (virtualDOM) {
    const component = new virtualDOM.type(virtualDOM.props)
    const nextVirtualDOM = component.render()

    nextVirtualDOM && (nextVirtualDOM.component = component)
    return nextVirtualDOM
}