import TinyReact from '../src/index'
import { FILTER_MODE } from './config'

class List extends TinyReact.Component {
    // 过滤数据
    get filterData () {
        const { filterMode, data } = this.props
        const mapFilterFn = {
            [FILTER_MODE.ALL]: d => d,
            [FILTER_MODE.PENDING]: d => d.filter(v => !v.checked),
            [FILTER_MODE.COMPLETE]: d => d.filter(v => v.checked),
        }

        return mapFilterFn[filterMode](data)
    }
    render () {
        const { data, action } = this.props

        return (
            <ul>
                {this.filterData.map(item => (
                    <li key={item.id}>
                        <input
                            type="checkbox"
                            checked={item.checked}
                            onChange={e => action.toggleCheckedStatus(item.id, e.target.checked)}
                        />
                        <span style={{ marginRight: '20px' }}>{item.content}</span>
                        <button onClick={() => action.removeItem(item.id)}>删除</button>
                    </li>
                ))}
            </ul>
        )
    }
}

export default List
