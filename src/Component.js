import diff from './diff'

export default class Component {
    constructor (props) {
        this.props = props
    }
    setDOM (dom) {
        this._dom = dom
    }
    getDOM () {
        return this._dom
    }
    setState (state) {
        let isUpdate = false
        const newState = {}

        // 判断是否有数据变化
        for (const key in state) {
            if (this.state[key] !== state[key]) {
                isUpdate = true
                break
            }
        }

        // 无数据变更则不重新渲染
        if (!isUpdate) return
 
        this.state = Object.assign({}, this.state, state)

        const virtualDOM = this.render()
        const oldDOM = this.getDOM()
        const container = oldDOM.parentNode

        virtualDOM.component = oldDOM._virtualDOM.component
        diff(virtualDOM, container, oldDOM)
    }
    updateProps (props) {
        this.props = props
    }

    // 生命周期
    componentWillMount() {}
    componentDidMount() {}
    componentWillReceiveProps(nextProps) {}
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps !== this.props || nextState !== this.state
    }
    componentWillUpdate(nextProps, nextState) {}
    componentDidUpdate(prevProps, preState) {}
    componentWillUnmount() {}
}