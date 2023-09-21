---
title: NeoVim中.vue文件曲线LSP
tags:
  - Develop
date: '2023-09-21'
createdOn: 1695271599728
updatedOn: 1695271599728
---
最近我开始尝试用**NeoVim**替代VsCode开发，在摸索了几天配置并实际在工作中使用后体感还不错，但仍有一个小问题如鲠在喉：.vue文件的`<style>`块缺少代码提示。
### 尝试
经过一段搜索后有说缺少`Treesitter`的Vue解析模块的，也有说`Mason`缺少相应LSP的，在重新把这两个插件中涉及到的相关模块都下了一遍后仍没有解决问题。
在郁闷了一天后突然想到怎么忘了AI代码提示这玩意，于是便去了看了下常用的代码提示器[codeium](https://codeium.com/)有没有支持NeoVim，结果是令人欣喜的，codeium几乎支持所有的编辑器，妙。

[codeium支持的编辑器](https://imgse.com/i/pPIM8ht)

```lua
{
  "Exafunction/codeium.vim",
  event = "BufEnter"
}
```

但codeium在我这边遇到一个按tab无法确认答案的bug，改个键就好了。
```lua
{
    'Exafunction/codeium.vim',
    event = 'BufEnter',
    config = function ()
        -- Change '<C-g>' here to any keycode you like.
        vim.keymap.set('i', '<C-q>', function ()
          return vim.fn['codeium#Accept']()
        end, { expr = true })
      end
}
```

codeium在VsCode和NeoVim中能达到的效果相差无几，虽然还无法完全替代代码提示，但足够用了。
