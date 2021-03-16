# VueScratchCard 刮刮卡组件 

## 介绍

插入刮刮卡组件

组件支持函数调用和组件调用 


## 注意

本组件未将样式抽离，遂无法自动转换rem，同时，由于本组件未设置全局变量去实时计算刮刮卡的数量动态变更Id，遂提供了 canvasParentId 和 canvasId 两个dom元素Id配置，若你需要添加多个刮刮卡，为防止Id冲突，这俩配置项将对你有用~


## 组件调用

`ScratchCard`组件可添加props属性后直接插入使用，可自己在组件上添加自定义类名覆盖样式
```js

import ScratchCard from '@kafan/vue-scratch-card'

// 全局注册
Vue.use(ScratchCard)
// 使用
<template>
    <v-scratchcard class="diyClassName" @scratchStart="start" @scratchEnd="end">
        <!-- <template v-slot:prize>
            <p style="position:absolute;width:100%;height:100%;paddingBottom:10px;color:#333">可选插槽插入自定义内容</p>
        </template> -->
    </v-scratchcard>
</template> 

<script>
export default {
    methods:{
        start(){
            //do something
        },
        end(){
            //do something
        }
    }
}
</script>
```
## props

组件调用时， 支持传入以下 `props`：

| 参数 | 说明 | 类型 | 默认值 | 备注 |
|------|------|------|------|------|
| prize-name | 中奖文案 | `String` | 恭喜你，中奖啦 | - |
| width | 刮刮卡宽度 | `String` | 100% | - |
| height | 刮刮卡高度 | `String` | 200px | - |
| show-scratch-overlay | 是否显示刮刮卡刮刮涂层 | `Boolean` | true | - |
| overlay-color | 纯色刮刮涂层 | `String` | #e5e5e5 | - |
| font-on-overlay | 刮刮涂层文字 | `String` | 刮开查看奖品 | - |
| font-color | 涂层文字颜色 | `String` | #bbb | - |
| font-size | 涂层字体大小 | `String` | 20px | - |
| overlay-pic | 图片刮刮涂层 | `String` | #bbb | 配置后纯色涂层效果将无效 |
| overlay-pic-repeat | 图片涂层是否循环渲染 | `String` | repeat | `['repeat','repeat-x','repeat-y','no-repeat']` |
| scope | 涂层自动刮开临界值 | `Number` | 2 | N分之一 |
| fontem | 画笔大小 | `Number` | 20 | - |
| canvas-parent-id | 刮刮卡父容器ID | `String` | fgo-scratchcard__canvas__parent | 同一页面多刮刮卡时使用，防止组件id冲突 |
| canvas-id | 刮刮卡canvas元素ID | `String` | fgo-scratchcard__canvas | 同一页面多刮刮卡时使用，防止组件id冲突 |



## 事件监听

组件调用时， 会触发以下事件，可供监听回调：

| 事件 | 返回值 | 说明 | 备注 |
|------|------|------|------|
| scratchStart | reset[is:重置函数] | 开始刮卡时 | 手指触控或鼠标按下 |
| scratchEnd | reset[is:重置函数] | 刮卡结束时 | 手指离开或鼠标点击抬起时 |
| scratchAll | reset[is:重置函数] | 刮光全部时 | 刮刮卡被刮完时 |
 

## 插槽使用

本组件有具名插槽prize供使用，即刮刮涂层下要显示的内容

示例

```js
    <template v-slot:prize>
        <p>可选插槽插入自定义内容</p>
    </template>
```

```

## 函数调用

```js

import ScratchCard from '@kafan/vue-scratch-card'

ScratchCard({
    canvasParentId:'ScratchCard_1',
    canvasId:'ScratchCard_1_canvas',
    targetContainer:document.querySelectorAll('.container')[0],
    slotScoped:()=>{
        return {
            //指定插槽名字
            "prize":{
                tag:'p', 
                data:{
                    style: {
                        position:'absolute', 
                        width:'100%', 
                        height:'100%', 
                        color: '#333', 
                        background:'blue',
                        paddingBottom: '10px'
                    }
                }, 
                text:'可选插槽插入自定义内容'
            }
        }
    },
    onScratchStart(){
        console.log('start');
    },
    onScratchEnd(){
        console.log('end');
    }
})

//可赋值到Vue原型上供全局使用
Vue.prototype.$ScratchCard = ScratchCard

``` 

## options

函数调用时， 支持传入以下 `options`：

| 参数 | 说明 | 类型 | 默认值 | 备注 |
|------|------|------|------|------|
| prizeName | 中奖文案 | `String` | 恭喜你，中奖啦 | - |
| width | 刮刮卡宽度 | `String` | 100% | - |
| height | 刮刮卡高度 | `String` | 200px | - |
| showScratchOverlay | 是否显示刮刮卡刮刮涂层 | `Boolean` | true | - |
| overlayColor | 纯色刮刮涂层 | `String` | #e5e5e5 | - |
| fontOnOverlay | 刮刮涂层文字 | `String` | 刮开查看奖品 | - |
| fontColor | 涂层文字颜色 | `String` | #bbb | - |
| fontSize | 涂层字体大小 | `String` | 20px | - |
| overlayPic | 图片刮刮涂层 | `String` | #bbb | 配置后纯色涂层效果将无效 |
| overlayPicRepeat | 图片涂层是否循环渲染 | `String` | repeat | `['repeat','repeat-x','repeat-y','no-repeat']` |
| scope | 涂层自动刮开临界值 | `Number` | 2 | N分之一 |
| fontem | 画笔大小 | `Number` | 20 | - |
| canvasParentId | 刮刮卡父容器ID | `String` | fgo-scratchcard__canvas__parent | 同一页面多刮刮卡时使用，防止组件id冲突 |
| canvasId | 刮刮卡canvas元素ID | `String` | fgo-scratchcard__canvas | 同一页面多刮刮卡时使用，防止组件id冲突 |
| targetContainer | 插入的容器 | `Object` | document.body | - |
| onScratchStart | 开始刮卡监听函数 | `Function` | () => {} | - |
| onScratchEnd | 结束刮卡回调函数 | `Function` | () => {} | - |
| onScratchAll | 刮刮卡刮完全部 | `Function` | () => {} | - |
| slotScoped | 插槽函数 | `Function` | () => {} | `[() => Object{"name":VNode}]` |

## API

函数调用时， 有以下API方法可以调用：

| 函数 | 参数 | 默认值 | 说明 | 备注 |
|------|------|------|------|------|
| init | - | - | 重置canvas蒙层 | - |
| reset | `{prizeName 或 slotScoped}` | `{ slotScoped: ()=>{return {}},prizeName:'恭喜你，中奖了' }` | 重置刮刮卡(包括底部中奖数据) | 选传一个，俩个都传插槽优先级高 |
