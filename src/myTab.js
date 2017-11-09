class MyTab {
  constructor(config = {}) {
    let opts = Object.create(MyTab.opts)
    opts = Object.assign(opts, config)
    if (!opts.selector) throw new Error('需要一个放置Tab的容器。')
    this.selector = opts.selector
    this.currentIndex = opts.currentIndex
    this.defaultIndex = opts.defaultIndex
    this.theme = opts.theme
    this.fixedWidth = opts.fixedWidth
    this.color = opts.color
    this.tabHeight = opts.tabHeight
    this.timingFunc = opts.timingFunc
    this.width = opts.width
    this.tabs = opts.tabs
    this.triggerEvent = opts.triggerEvent
    this.loop = opts.loop
    this.container = document.querySelector(this.selector)
    // this.insertStyle()
    this.init()
  }

  init() {
    this.container.classList.add('my-tab')
    if (this.theme === 'card') {
      this.container.classList.add('card')
    }

    this.tabList = this.generateTabs()
    this.tabContent = this.container.querySelector('.my-tab-content')
    if (!this.tabContent) { throw new Error('需要添加内容。')}
    this.tabContent.style.width = this.tabs.length * 100 + '%'
    this.container.insertBefore(this.tabList, this.tabContent)
    this.tabWidth = this.tabList.firstChild.getBoundingClientRect().width

    this.indicator = this.generateIndicator()
    this.tabList.appendChild(this.indicator)

    this.node2Array(this.tabList.children).forEach(tab => {
      tab.addEventListener(
        this.triggerEvent,
        this.handleTabChange.bind(this),
        false
      )
    })

    this.node2Array(this.tabContent.children).forEach(content => {
      content.addEventListener('touchstart', this.moveStart.bind(this), false)
      content.addEventListener('touchend', this.moveEnd.bind(this), false)
    })

    this.indexContentItem()
  }

  node2Array(nodeList) {
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
    this.tabs.forEach((tab, index) => {
      const li = document.createElement('li')
      li.classList.add('tab')
      li.innerHTML = tab.title
      li.dataset.index = index
      li.style.color = this.color
      li.style.height = this.tabHeight
      if (index === this.defaultIndex) {
        li.classList.add('active')
      }
      if (this.fixedWidth) {
        li.classList.add('fixed-width')
      }
      if (tab.disabled) {
        li.classList.add('disabled')
      }
      tabList.appendChild(li)
    })
    if (this.theme === 'card') {
      tabList.classList.add('card')
      tabList.firstChild.classList.add('card')
    }
    if (this.fixedWidth) {
      tabList.classList.add('fixed-width')
    }
    return tabList
  }

  generateIndicator() {
    const width = Math.floor(
      this.tabList.firstChild.getBoundingClientRect().width
    )
    const indicator = document.createElement('div')
    indicator.classList.add('indicator')
    if (this.theme === 'card') {
      indicator.classList.add('hide')
    }
    indicator.style.width = width + 'px'
    indicator.style.background = this.color
    return indicator
  }

  insertStyle() {
    const styleEle = document.createElement('style')
    styleEle.innerHTML = `.my-tab {
      width: 90%;
      max-width: 1000px;
      margin: 10px auto;
      overflow: hidden;
      background: #ffffff;
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
        0 3px 1px -2px rgba(0, 0, 0, 0.2);
    }
    .my-tab.card {
      border: 1px solid #e2e2e2;
      box-shadow: 0 2px 5px 0 rgba(0,0,0,.1);
    }
    .my-tab .my-tab-list {
      position: relative;
      margin: 0;
      padding: 0;
      list-style: none;
      border-bottom: 1px solid #e2e2e2;
    }
    .my-tab .my-tab-list.card {
      background: #f2f2f2;
    }
    .my-tab .my-tab-list.fixed-width {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
    
    .my-tab .my-tab-list .indicator {
      position: absolute;
      left: 0;
      bottom: -1px;
      height: 2px;
      background: blueviolet;
      will-change: left, right, transform;
      transition: all .4s ease-in-out;
      transform: scaleX(1);
    }
    .my-tab .my-tab-list .indicator.card {
      opacity: 0;
    }
    .my-tab .my-tab-list .tab {
      position: relative;
      display: inline-block;
      min-width: 65px;
      padding: 0 24px;
      margin: 0 -1px;
      height: 40px;
      line-height: 40px;
      color: blueviolet;
      font-weight: 500;
      text-align: center;
      cursor: pointer;
      border: 1px solid transparent;
      vertical-align: baseline;
    }
    .my-tab .my-tab-list .tab.fixed-width {
      flex: 1;
    }
    .my-tab .my-tab-list .tab.card {
      border-left: 1px solid #e2e2e2;
      border-right: 1px solid #e2e2e2;
      background: #ffffff;
    }
    .my-tab .my-tab-list .tab.card::after {
      position: absolute;
      left: 0;
      bottom: -2px;
      content: '';
      width: 100%;
      height: 1px;
      z-index: 100;
      background: #ffffff;
    }
    .my-tab .my-tab-list .tab.disabled {
      cursor: default;
    }
    .my-tab .my-tab-content {
      position: relative;
      display: flex;
      justify-content: flex-start;
      align-content: center;
    }
    
    .my-tab .my-tab-content .item {
      width: 100%;
      max-width: 100%;
      height: 100%;
      padding: 12px 24px;
      transform: translateX(0px);
      transition: all .4s ease-in-out;
    }
    `
    document.head.appendChild(styleEle)
  }

  handleTabChange(event) {
    const target = event.target
    if (target.classList.contains('disabled')) return
    const tabs = this.node2Array(this.tabList.children)
    const index = parseInt(target.dataset.index, 10)
    this.currentIndex = index
    this.changeTab(this.currentIndex, target)
  }

  moveStart(event) {
    this.touchStart = 0
    const touchs = event.targetTouches
    this.touchStart = touchs[0].pageX
  }

  moveEnd(event) {
    this.touchEnd = 0
    const touchs = event.changedTouches
    this.touchEnd = touchs[0].pageX
    const offset = this.touchEnd - this.touchStart
    if (Math.abs(offset) >= 50 && offset > 0) {
      this.nextTab()
    } else {
      this.prevTab()
    }
  }

  nextTab() {
    ++this.currentIndex
    this.currentIndex = Math.min(this.tabs.length - 1, this.currentIndex)
    this.changeTab(this.currentIndex)
  }

  prevTab() {
    --this.currentIndex
    this.currentIndex = Math.max(0, this.currentIndex)
    this.changeTab(this.currentIndex)
  }
  
  changeTab (index) {
    const tabs = this.node2Array(this.tabList.children)
    if (this.theme === 'card') {
      tabs.forEach(tab => tab.classList.remove('card'))
      tabs[index].classList.add('card')
    }
    tabs.forEach(tab => tab.classList.remove('active'))
    tabs[index].classList.add('active')
    this.moveIndicator(index)
    this.changeContentItem(index)
  }

  moveIndicator(index) {
    this.indicator.style.transform = 'scaleX(.7)'
    this.indicator.style.left = index * this.tabWidth + 'px'
    setTimeout(() => {
      this.indicator.style.transform = 'scaleX(1)'
    }, this.moveTime)
  }

  changeContentItem(index) {
    this.node2Array(this.tabContent.children).forEach(item => {
      item.style.transform = `translateX(${-index * 100}%)`
    })
  }
}

MyTab.opts = {
  selector: 'my-tab',
  currentIndex: 0,
  defaultIndex: 0,
  theme: 'flat', // card
  fixedWidth: false,
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
