import TinyReact from '../src/index'
import { FILTER_MODE } from './config'

const filterOptions = [
    { label: '全部', value: FILTER_MODE.ALL },
    { label: '待办', value: FILTER_MODE.PENDING},
    { label: '已完成', value: FILTER_MODE.COMPLETE },
]

class Footer extends TinyReact.Component {
    get checkedList () {
        return this.props.data.filter(v => v.checked)
    }
    render () {
        const { data, action, filterMode, setFilterMode } = this.props

        if (!data.length) {
            return null;
        }
        return (
            <div>
                <p>
                    {filterOptions.map(item => (
                        <a
                            key={item.value}
                            href="javascript:;"
                            style={{
                                margin: '0 4px',
                                ...(item.value === filterMode ? {
                                    color: '#000',
                                    textDecoration: 'none'
                                } : {})
                            }}
                            onClick={() => setFilterMode(item.value)}
                        >
                            {item.label}
                        </a>
                    ))}
                </p>

                <p>
                    共 {data.length} 个任务，已完成 {this.checkedList.length} 个任务
                    {!!this.checkedList.length && (
                        <a href="javascript:;" onClick={action.clearCompleteItem}>清除</a>
                    )}
                </p>
            </div>
        )
    }
}

export default Footer
