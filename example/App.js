import TinyReact from '../src/index'
import Action from './Action'
import { FILTER_MODE } from './config'
import Footer from './Footer'
import Header from './Header'
import List from './List'
import Title from './Title'

class App extends TinyReact.Component {
    constructor (props) {
        super(props)

        this.state = {
            data: [],
            filterMode: FILTER_MODE.ALL
        }
        this.action = new Action(this.state.data, data => this.setState({ data }))
        this.setFilterMode = this.setFilterMode.bind(this)
    }
    setFilterMode (filterMode) {
        this.setState({ filterMode })
    }
    render () {
        const { data, filterMode } = this.state

        return (
            <div>
                <Title>TodoList</Title>
                <Header action={this.action} />
                <List data={data} action={this.action} filterMode={filterMode} />
                <Footer
                    data={data}
                    action={this.action}
                    filterMode={filterMode}
                    setFilterMode={this.setFilterMode}
                />
            </div>
        )
    }
}

export default App
