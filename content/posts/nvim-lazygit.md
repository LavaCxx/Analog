---
title: NeoVim中使用git
tags:
  - Develop
date: '2023-10-16'
createdOn: 1697419884748
updatedOn: 1697419884748
---

在使用NeoVim代替VSCode开发的一个月中我得出一个经验：对于这种备受赞誉的效率工具如果使用中感觉有不”流畅“的地方，那肯定是自己方法不对，而git的使用正是其中之一。
因为`<leader>`菜单里的Lazygit每次打开都是一片空白，总以为是遇到bug或者操作不对的我只能另开终端去用git，颇为麻烦。后来实在忍不了打开官网才知道原来还是需要另外下载的，这就好办了，用上。

### 安装和使用
MacOS直接Homebrew一把梭就是
```bash
brew install jesseduffield/lazygit/lazygit
```
[![example](https://z1.ax1x.com/2023/10/15/pi9v5EF.jpg)](https://imgse.com/i/pi9v5EF)


Lazygit的键位映射基本按照命令的首字母来，比较好记。

- **a**：`git add -A`/`git reset`
- **c**：`git commit -m "message"`
- **p**：`git pull`
- **P**：`git push`
- **1/2/3/4/5**：切换窗口
- **\:command**：自定义命令


