let id = 0

export default class Action {
    constructor (data, updateData) {
        this.data = data
        this.updateData = nextData => {
            updateData(nextData)
            this.data = nextData
        }
        this.addItem = this.addItem.bind(this)
        this.toggleCheckedStatus = this.toggleCheckedStatus.bind(this)
        this.removeItem = this.removeItem.bind(this)
        this.clearCompleteItem = this.clearCompleteItem.bind(this)
    }
    // 添加一条数据
    addItem (content) {
        const newData = [{
            id: id++,
            content,
            checked: false,
            isEdit: false
        }].concat(this.data)

        this.updateData(newData)
    }
    // 切换选中状态
    toggleCheckedStatus (id, checked) {
        const dataDraft = JSON.parse(JSON.stringify(this.data))
        const currItem = dataDraft.find(v => v.id === id)

        if (currItem) {
            currItem.checked = checked
        }
        this.updateData(dataDraft)
    }
    // 删除一条数据
    removeItem (id) {
        const newData = this.data.filter(v => v.id !== id)

        this.updateData(newData)
    }
    // 清除完成数据
    clearCompleteItem () {
        const newData = this.data.filter(v => !v.checked )

        this.updateData(newData)
    }
}