---
title: 新博客施工记录
tags:
  - Develop
category: 测试
date: '2023-08-28'
createdOn: 1693210285984
updatedOn: 1698555381864
---
### TodoList
- [x] Home
- [x] Post
- [ ] Memo：计划使用github或者notion管理数据（考虑放弃设置Memo页，毕竟大概率不会用）
- [x] Friend：样式还在想
- [x] About：样式和文章都在想
- [ ] Markdown：Prose的样式还差点意思，考虑要么换掉要么改改
- [x] Waline
- [x] 组件：主题转换，时间/天气？



---

### 开发中遇到的问题
#### lint-staged不生效
本来基于lint-staged自动记录md文件编辑时间的机制突然失效了,一开始想着是版本问题,安装了旧博客上的版本后依然不生效.

过了一阵子后突然又可以了,莫名其妙.

#### Cannot find node-fetch-native
vercel报错,解决办法是给项目下载这一polyfill

#### ERR_PNPM_OUTDATED_LOCKFILE
全信息为: `ERR_PNPM_OUTDATED_LOCKFILE  Cannot install with "frozen-lockfile" because pnpm-lock.yaml is not up to date with package.json`,同样是vercel报错,我怀疑跟我改过项目文件夹的权限或者是上面修复lint-staged版本时产生的附带问题.
尝试删除**pnpm-lock**文件重新生成也无济于事,最后的解决办法是将vercel的build指令指定为`npm build`

---

以下部分用于测试markdown的渲染.

# 一号标题
## 二号标题
### 三号标题

### 四号标题

*斜体文本*
_斜体文本_
**粗体文本**
__粗体文本__
***粗斜体文本***
___粗斜体文本___
~~BAIDU.COM~~

***


1. 有序
2. 有序

+ 无序
+ 无序

- [ ] false
- [x] true

![MDN](https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg)

|  表头   | 表头  |
|  ----  | ----  |
| 单元格  | 单元格 |
| 单元格  | 单元格 |



```javascript
console.log("hello world")
```
