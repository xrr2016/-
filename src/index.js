const tabList = document.querySelector('.my-tab-list')
const tabs = Array.from(document.querySelectorAll('.my-tab-list .tab'))
const items = document.querySelectorAll('.my-tab-content .item')
const indicator = document.querySelector('.my-tab-list .indicator')
indicator.style.width = tabs[0].getBoundingClientRect().width + 'px'
const moveTime = 300
const loopInterval = 1000

function moveIndicator(index, width) {
  indicator.style.transform = 'scaleX(.7)'
  indicator.style.left = index * width + 'px'
  setTimeout(() => {
    indicator.style.transform = 'scaleX(1)'
  }, moveTime)
}

function changeContentItem(index) {
  items.forEach(item => {
    item.style.transform = `translateX(${-index * 100}%)`
  })
}

// function loopTab() {
//   setInterval(function () {
//     tabs.forEach(tab => {
//       const i = parseInt(tab.dataset.index, 10)
//       const w = tab.getBoundingClientRect().width
//       moveIndicator(i, w)
//       changeContentItem(i)
//     })
//   }, loopInterval)
// }

// loopTab()

const handleTabChange = function handleTabChange(event) {
  const target = event.target
  const index = parseInt(target.dataset.index, 10)
  const targetW = target.getBoundingClientRect().width
  // for (let index = 0; index < tabs.length; index++) {
  //   const tab = tabs[index]
  //   tab.classList.remove('card')
  // }
  // target.classList.add('card')
  moveIndicator(index, targetW)
  changeContentItem(index)
}

tabs.forEach(tab => {
  tab.addEventListener('click', handleTabChange, false)
  // tab.addEventListener('mouseover', handleTabChange, false)
  tab.addEventListener('touchend', handleTabChange)
})
