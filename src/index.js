import MyTab from './myTab'

console.log('index')
const tab1 = new MyTab({
  selector: '.my-tab-1'
})

const tab2 = new MyTab({
  selector: '.my-tab-2',
  theme: 'card',
  color: '#3498db'
})

const tab3 = new MyTab({
  selector: '.my-tab-3',
  color: '#e74c3c',
  fixedWidth: true,
  tabs: [
    { title: '选项1', disabled: false },
    { title: '选项2', disabled: false },
    { title: '选项3', disabled: false },
    { title: '选项4', disabled: false },
    { title: '选项5', disabled: false }
  ]
})

const tab4 = new MyTab({
  selector: '.my-tab-4',
  color: '#00a497',
  tabs: [
    { title: '我', disabled: false },
    { title: '火', disabled: false },
    { title: '总', disabled: false },
    { title: '冠', disabled: false },
    { title: '军', disabled: false }
  ]
})
