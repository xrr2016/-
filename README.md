# MyTab

> 一个简介的 Tab 插件。

[demo](http://xiaoranran.site/myTab/)

Install

> npm i  --save

Usage

```js
import MyTab from 'Mytab'

new MyTab({
  selector: 'Your selector' // need
})

// options
// {
//   selector: 'my-tab',
//   defaultIndex: 0,
//   theme: 'flat', // card
//   fixedWidth: false,
//   color: 'blueviolet',
//   fontSize: 14,
//   width: 600,
//   tabHeight: 40,
//   timingFunc: 'ease-in-out',
//   tabs: [
//     { title: '选项1', disabled: false },
//     { title: '选项2', disabled: false },
//     { title: '选项3', disabled: false }
//   ],
//   triggerEvent: 'click',
//   loop: false,
//   moveTime: 300
// }
```

```html
<div class="Your selector">
    <div class="my-tab-content">
      <div class="item">
        <!-- Your content here -->
      </div>
    </div>
  </div>
```





