---
title: 命令式弹窗调用与踩坑
tags:
  - Develop
date: '2024-01-05'
createdOn: 1704435225205
updatedOn: 1704435225205
---
几个月前在逛xLog看到这么一篇innei的一篇[文章](https://innei.in/posts/programming/why-i-prefer-imperative-modal)给了我比较大的启发，虽然我很少用Modal，但是Dialog在工作上倒是经常在用，能不能把同样的思路也应用到Dialog上呢？于是我遍进行了一番探索。

> 为什么去年做的事现在才说（~~这不是想水一篇文章么~~），主要也是因为几个月工作用下来还挺稳没什么问题，也该拿出来分享了。

## Why
非常惭愧的一件事是，由于公司项目主要还是以Vue2为主，本次分享的代码也是基于Vue2编写，但基于同样的思路也可以用到其它框架上。

公司以往的项目代码中调用一个Dialog往往需要以下部分的代码：
```vue
<template>
	<button @click="show(data)">
	<FooDialog :visible="visible" :data="currentItem" @confirm="confirm" @close="close" />
</template>
<script>
	import FooDialog from '../FooDialog.vue'
	export default {
		components:{ FooDialog },
		data() {
			return {
				visible: false,
				currentItem: {}
			}
		},
		methods: {
			show(data) {
				this.visible = true
				this.currentItem = { ...data }
			},
			close() {
				this.visible = false
			},
			confirm() {
				this.close()
				this.getData()
			},
			getData() {
			  // ...
			}
		}
	}
</script>
```
这种情况下页面需要维护的Dialog相关变量和方法需要的代码行数不少，而当页面不止一种Dialog时代码会愈加复杂，光是命名就得花上一番功夫，结果往往就是一大堆难看的`xxxDialogVisible`充斥页面。

## How
由于Dialog的结构远比Modal复杂，这里是不能套用innei的方法来做的，先总结一下需求：
- Dialog代码尽量保持不变；
- 调用Dialog的页面里只需要一个方法就能实现调用Dialog，无需其它状态变量或事件函数；
- 要能随用随生成，不用时销毁就更好了。
> 第三点相当重要，在给Dialog传不同的值时经常需要根据这些新值做额外的操作，在老的Dialog调用方法中因为Dialog在页面初始化后就一直存在，往往需要监听`data`或`visible`的状态来判断，相当麻烦。


而这正好让我想起两个东西：`Vue.extend()`实例化组件和**Element UI**中`el-dialog`的`append-to-body`属性。
```js
export function DialogImpl(component) {
	const CompConstructor = Vue.extend(component);
	const compInstance = new CompContructor().$mount();

	documnet.body.appendChild(compInstance.$el)
}
```
这样一来，只要把组件放进去就能创建出实例挂载到`body`上，接下来再完善一下事件监听和销毁。
```js
export function DialogImpl(component, data) {
	const CompConstructor = Vue.extend(component);
	const compInstance = new CompContructor().$mount();
	// 因为每个Dialog在业务上可能各有不同，传值方面我个人的做法是当Dialog实例时自动执行一个init函数。
	compInstance.$options.init(deepClone(data));

	documnet.body.appendChild(compInstance.$el);

	const destoryComp = (instance) =>{
		instance.$destory();
		document.body.removeChild(instance.$el);
	}
	return new Promise((resolve, reject)) => {
		compInstance.$on('confirm', (res) => {
			destoryComp(compInstance);
			resolve(res)
		});
		compInstance.$on('close', (res) => {
			destoryComp(compInstance);
			reject()
		})
	}
}
```
**补充**
在经过一段时间的使用后发现`extend`出来的实例化对象并没有被挂载上VueX，因此还需要完善以上代码。
```js
import store from '@/store'
// ...
const compInstance = new CompContructor({ store }).$mount();
// ...
```

## Use
方法有了，那用来重构一下楼上那段代码看看（假设方法已经全局引入）。
```vue
<template>
	<button @click="show(data)">
</template>
<script>
	import FooDialog from '../FooDialog.vue'
	export default {
		data() {
			return {
			}
		},
		methods: {
			show(data) {
				this.DialogImpl(FooDialog, data).then(res => {
					// ...
					this.getData() 
				})
			},
			getData() {
			  // ...
			}
		}
	}
</script>
```
霎时间清爽很多。
## Extend
> 待补充其它框架写法
