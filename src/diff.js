import createDOMElement from './createDOMElement';
import mountElement from './mountElement';
import unmountNode from './unmountNode';
import diffComponent from './diffComponent';
import updateNodeElement from './updateNodeElement';
import { isFunction } from './utils';
import updateTextNode from './updateTextNode';

// 对比新旧 virtualDOM，将差异渲染到真实 DOM 上
export default function diff (virtualDOM, container, oldDOM) {
    const oldVirtualDOM = oldDOM && oldDOM._virtualDOM
    
    if (!oldDOM) {
        // 不存在 oldDOM 代表第一次渲染，直接渲染元素
        mountElement(virtualDOM, container)
    } else if (!virtualDOM || oldVirtualDOM.type !== virtualDOM.type) {
        // 是否是组件
        if (!isFunction(virtualDOM)) {
            // 元素类型不一样时，直接渲染新元素，替换旧元素
            const newElement = createDOMElement(virtualDOM)

            // 如果 newElement 不是 null，使用替换，否则直接删除
            if (newElement) {   
                oldDOM.parentNode.replaceChild(newElement, oldDOM)
            } else {
                unmountNode(oldDOM)
            }
        } else {
            diffComponent(virtualDOM, oldVirtualDOM, oldDOM, container)
        }
    } else if (virtualDOM && oldVirtualDOM.type === virtualDOM.type) {
        // 元素类型一样时

        if (virtualDOM.type === 'text') {
            // 文本节点
            updateTextNode(virtualDOM, oldVirtualDOM, oldDOM)
        } else {
            // 元素节点
            updateNodeElement(oldDOM, virtualDOM, oldVirtualDOM)
        }

        // 获取所有旧的子元素 DOM
        const oldChildNodes = oldDOM.childNodes

        // 用于存储含有 key 属性的元素
        const keyedElements = {}

        // 检测带有 key 属性的元素并存起来
        for (let i = 0, len = oldChildNodes.length; i < len; i++) {
            const domElement = oldChildNodes[i];

            // 元素节点才需做处理
            if (domElement.nodeType === 1) {
                const key = domElement._virtualDOM.props.key

                if (key !== undefined && key !== null) {
                    keyedElements[key] = domElement
                }
            }
        }


        // 是否没有 key
        const hasNoKey = Object.keys(keyedElements).length === 0

        // 处理子元素
        if (hasNoKey) {
            (virtualDOM.children || []).forEach((child, i) => {
                diff(child, oldDOM, oldDOM.childNodes[i])
            })
        } else {
            // TODO 子元素没更新
            (virtualDOM.children || []).forEach((child, i) => {
                const key = child.props.key
    
                if (key === undefined || key === null) {
                    // 没有 key 属性直接渲染
                    mountElement(child, oldDOM, oldDOM.childNodes[i])
                    return
                }
                const domElement = keyedElements[key]
    
                if (domElement) {
                    // 当前位置的元素不是我们期望的元素，将期望的元素移动到当前位置
                    if (oldChildNodes[i] && oldChildNodes[i] !== domElement) {
                        oldDOM.insertBefore(domElement, oldChildNodes[i])
                    }

                    updateNodeElement(domElement, child, domElement._virtualDOM)
                } else {
                    mountElement(child, oldDOM, oldChildNodes[i], false)
                }
            })
        }

        const newChildCount = (virtualDOM.children || []).length

        if (oldChildNodes.length > newChildCount) {
            if (hasNoKey) {
                for (
                    let i = oldChildNodes.length - 1;
                    i > newChildCount - 1;
                    i--
                ) {
                    unmountNode(oldChildNodes[i])
                }
            } else {
                for (let i = 0; i < oldChildNodes.length; i++) {
                    const oldChild = oldChildNodes[i];
                    const oldKey = oldChild._virtualDOM.props.key
                    let found = false

                    for (let j = 0; j < virtualDOM.children.length; j++) {
                        if (oldKey === virtualDOM.children[j].props.key) {
                            found = true
                            break
                        }
                    }
                    
                    if (!found) {
                        unmountNode(oldChild)
                        i--
                    }
                }
            }
        }
    }
}
