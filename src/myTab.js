class MyTab {
  constructor(config) {
    const opts = Object.assign(MyTab.opts, config)
    if (!opts.selector) throw new Error('需要一个放置Tab的容器。')
    this.selector = opts.selector
    this.currentIndex = opts.currentIndex
    this.defaultIndex = opts.defaultIndex
    this.theme = opts.theme
    this.flexWidth = opts.flexWidth
    this.color = opts.color
    this.tabHeight = opts.tabHeight
    this.timingFunc = opts.timingFunc
    this.width = opts.width
    this.tabs = opts.tabs
    this.triggerEvent = opts.triggerEvent
    this.loop = opts.loop
    this.container = document.querySelector(this.selector)
    this.init()
  }

  init() {
    this.container.classList.add('my-tab')
    if (this.theme === 'card') {
      this.container.classList.add('card')
    }
    this.tabList = this.generateTabs()
    this.tabContent = this.container.querySelector('.my-tab-content')
    this.tabContent.style.width = this.tabs.length * 100 + '%'
    this.container.insertBefore(this.tabList, this.tabContent)
    this.indicator = this.generateIndicator()
    this.tabList.appendChild(this.indicator)

    this.node2Array(this.tabList.children).forEach(tab => {
      tab.addEventListener(this.triggerEvent, this.handleTabChange.bind(this))
    })

    this.indexContentItem()
  }

  node2Array (nodeList) {
    return Array.prototype.slice.call(nodeList)
  }

  indexContentItem() {
    const items = this.node2Array(this.tabContent.children)
    this.tabs.forEach((tab, index) => {
      if (index >= this.tabs.length) return
      items[index].dataset.index = index
    })
  }

  generateTabs() {
    const tabList = document.createElement('ul')
    tabList.classList.add('my-tab-list')
    if (this.theme === 'card') {
      tabList.classList.add('card')
    }
    this.tabs.forEach((tab, index) => {
      const li = document.createElement('li')
      li.classList.add('tab')
      li.innerHTML = tab.title
      li.dataset.index = index
      li.style.color = this.color
      if (this.theme === 'card') {
        li.classList.add('card')
      }
      if (this.flexWidth) {
        li.style.flex = 1
      }
      if (tab.disabled) {
        li.classList.add('disabled')
      }
      tabList.appendChild(li)
    })
    return tabList
  }

  generateIndicator() {
    const width = Math.floor(this.tabList.firstChild.getBoundingClientRect().width)
    const indicator = document.createElement('div')
    indicator.classList.add('indicator')
    indicator.style.width = width + 'px'
    indicator.style.background = this.color
    return indicator
  }

  insertStyle() {}

  handleTabChange(event) {
    const target = event.target
    console.log(target)
    if (target.classList.contains('disabled')) return
    const index = parseInt(target.dataset.index, 10)
    const targetW = target.getBoundingClientRect().width
    if (this.theme === 'card') {
      const tabs = this.container.querySelectorAll('.my-tab-list .tab')
      for (let index = 0; index < tabs.length; index++) {
        const tab = tabs[index]
        tab.classList.remove('card')
      }
      target.classList.add('card')
    }
    this.moveIndicator(index, targetW)
    this.changeContentItem(index)
  }

  moveIndicator(index, width) {
    this.indicator.style.transform = 'scaleX(.7)'
    this.indicator.style.left = index * width + 'px'
    setTimeout(() => {
      this.indicator.style.transform = 'scaleX(1)'
    }, this.moveTime)
  }

  changeContentItem(index) {
    const items = this.container.querySelectorAll('.my-tab-content .item')
    items.forEach(item => {
      item.style.transform = `translateX(${-index * 100}%)`
    })
  }
}

MyTab.opts = {
  selector: 'my-tab',
  currentIndex: 0,
  defaultIndex: 0,
  theme: 'flat', // card
  flexWidth: false,
  color: 'blueviolet',
  width: 600,
  tabHeight: 40,
  timingFunc: 'ease-in-out',
  tabs: [
    { title: '选项1', disabled: false },
    { title: '选项2', disabled: false },
    { title: '选项3', disabled: false }
  ],
  triggerEvent: 'click',
  loop: false,
  moveTime: 300
}

new MyTab({
  selector: '.my-tab-2',
  theme: 'card',
  color: 'goldenrod'
})
