---
tags:
  - Test
  - Test2
title: Test
category: 测试
date: '2023-08-13'
createdOn: 1691933284390
updatedOn: 1693116210842
---
// 复制来的文章

全称 CSS Type Object Model

## computedStyleMap

```js
document.querySelector('.buy-btn').computedStyleMap()
```
此时返回了一个 StylePropertyMapReadOnly  Map 对象, 可以像 Map 一样读取

```js
const styleMap = document.querySelector('.buy-btn').computedStyleMap()

styleMap.get('line-height').value
// 50
styleMap.get('line-height').unit
// px
```
获得的属性和 getComputedStyle 一致，但是不需要二次解析

如果是值是关键字，则无 unit
```js
const styleMap = document.querySelector('.buy-btn').computedStyleMap()
styleMapget('width').value
// 'auto'
styleMapget('width').unit
// undefined
```
::FriendCard{title="Pantheon" url="https://blog.pantheon.press/"}
