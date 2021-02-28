import TinyReact from '../src/index'

class Header extends TinyReact.Component {
    constructor (props) {
        super(props)

        this.state = {
            value: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleKeyup = this.handleKeyup.bind(this)
    }
    handleChange (e) {
        const { value } = this.props

        if (e.target.value !== value) {
            this.setState({ value: e.target.value })
        }
    }
    handleKeyup (e) {
        const { data, action } = this.props
        const { value } = this.state
        const content = value.trim()

        if (content && e.keyCode === 13) {
            this.setState({ value: '' })
            action.addItem(content)
        }
    }
    render () {
        const { value } = this.state

        return (
            <div>
                <input
                    ref={r => (this.inputDOM = r)}
                    placeholder="按回车键添加任务"
                    value={value}
                    onInput={this.handleChange}
                    onKeyup={this.handleKeyup}
                />
            </div>
        )
    }
}

export default Header
