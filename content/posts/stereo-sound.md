---
title: Web Can Do This - JS实现立体声模拟
tags:
  - Develop
date: '2023-09-11'
createdOn: 1694365036642
updatedOn: 1695285687503
incomplete: true
---

## 前言
作为一个学艺不精的前端从业者，我一直对做笔记这件事感到十分纠结。纠结的点总结起来就一句话：**太简单的不如看文档，太难的写不出来**。
但几年工作下来，重复单调的业务已经无法再反映个人技术的进步，思索良久，决定终究还是得写点什么才行，于是便有了这篇文章。

***Web Can Do This***是一系列关于浏览器能实现的稀罕效果的文章，这些效果你可能在别的地方已经熟视无睹，但从没想过它们也能在Web中复现

> 并非一时冲动，我一直对这方面的内容感兴趣。几个预计以后写的点在搜索引擎中也没找到多少相关讨论内容，也算差异化赛道了。

## 先从了解Web Audio API开始
先跟不了解浏览器发声相关内容的人普及一下。  
Html的`<Audio>`标签大家都知道，通过更改它的`src`属性辅以`play()`和`pause()`等方法就可以实现简单的声音播放了。

`<Audio>`虽然使用方便，但`src`的限制掣肘了定制化声音的可能，总不可能给每个可能出现的声音都保留一份音频文件吧？这时候就要上真家伙了。

**Web Audio API**就是浏览器中解决声音问题的终极方案，音频届的**Canvas**。该API涉及的知识点太多并不是三言两语能说完的~~再说了我也不会~~，我用简短的内容介绍一下基本的使用方法。

众所周知，声音是一种机械波，有四种基本属性：  
- **音高**：物体振动的频率。越低声音显得越低沉，越高声音就越尖锐~~谁家小孩~~；
- **音强**：振幅。最容易理解的属性，越高越响；
- **音长**：持续时间；
- **音色**：物体的振动方式。比如同一个音，你很容易区分出是吉他的还是钢琴的。

我为什么要讲起初中物理呢？自然是因为代码发声也要按照基本法，缺了这四要素就发不出声音了。API中的`OscillatorNode`负责控制前两者，`GainNode`负责控制后两者。
```javascript
const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
const oscillator = audioCtx.createOscillator()
const gainNode=audioCtx.createGain()
// 调整音色，API内置四种简易波形，分别是正弦波sine、方波square、三角波triangle和锯齿波sawtooth
oscillator.type = "sine"
// 调整音高
oscillator.frequency = 440
// 调整音量
// gainNode.gain.value = 1
// currentTime是每个AudioContext的独有时间轴
gainNode.gain.linearRampToValueAtTime(1,audioCtx.currentTime)
gainNode.gain.exponentialRampToValueAtTime(0.01,audioCtx.currentTime+1)
// 连接节点和发声设备
oscillator.connect(gainNode)
gainNode.connect(audioCtx.destination)
// 发声
oscillator.start()
```


## PannerNode
进入正题,要想实现立体声，我们就需要`OscillatorNode`和`GainNode`之间的第三个节点`PannerNode`，这个节点可以控制声源于接收者之间的位置和衰减等参数，最后我们得到了这么一个声音路径图。
[![audio-routing-graph](https://z1.ax1x.com/2023/09/14/pPRtcAs.md.png)](https://imgse.com/i/pPRtcAs)
## Demo
::Stereo
