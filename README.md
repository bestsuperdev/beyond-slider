# beyond-slider

React 轮播组件/移动设备可滑动切换

## 安装
```
$ npm install --save beyond-slider
```
### slider
#### 基本用法（图片轮播）

```jsx
require('beyond-slider/lib/index.css')
import React, { Component } from 'react';
import Slider , {Item} from 'beyond-slider'
class myComponent extends Component{
  render(){
    return(
          <Slider mobile width={500} height={300} interval={2} autoPlay pauseOnAction controlNav directionNav>
            <Item key="0"><a href="http://www.800best.com"> <img style={{width:'100%',height : '100%'}} src={require('images/c1.jpg')} /></a></Item>
            <Item key="1"><a href="http://www.800best.com"> <img style={{width:'100%',height : '100%'}} src={require('images/c2.jpg')} /></a></Item>
            <Item key="2"><a href="http://www.800best.com"> <img style={{width:'100%',height : '100%'}} src={require('images/c3.jpg')} /></a></Item>
            <Item key="3"><a href="http://www.800best.com"> <img style={{width:'100%',height : '100%'}} src={require('images/c4.jpg')} /></a></Item>	
          </Slider>

    )
  }
}

```
#### 基本用法（图片切换效果为渐变效果）

```jsx
require('beyond-slider/lib/index.css')
import React, { Component } from 'react';
import Slider , {Item} from 'beyond-slider'
class myComponent extends Component{
  render(){
    return(
          <Slider gradient height={300} interval={4} autoPlay={true} pauseOnAction={true} controlNav={true} directionNav={true} prev={(<i>向前</i>)}>
            <Item key="0"><a href="http://www.800best.com"> <img style={{width:'100%',height : '100%'}} src={require('images/c1.jpg')} /></a></Item>
            <Item key="1"><a href="http://www.800best.com"> <img style={{width:'100%',height : '100%'}} src={require('images/c2.jpg')} /></a></Item>
            <Item key="2"><a href="http://www.800best.com"> <img style={{width:'100%',height : '100%'}} src={require('images/c3.jpg')} /></a></Item>
            <Item key="3"><a href="http://www.800best.com"> <img style={{width:'100%',height : '100%'}} src={require('images/c4.jpg')} /></a></Item>
          </Slider>	

    )
  }
}

```
              


## API 

**Slider**

| 名称        | 类型   |  默认值  |  说明  |
| ----------- | ------ | ------ | ------ |
|  width  | number/string |  -   |  设置 Slider 宽度  |
|  height  | number/string |  400   |  设置 Slider 高度  |
|  interval  | number/string |  2  |  设置轮播的时间间隔,单位为秒  |
|  autoPlay  | boolean |  true  |  是否开启自动轮播  |
|  pauseOnAction  | boolean |  true  |  设置鼠标悬停时是否停止轮播  |
|  controlNav  | boolean |  true   |  显示 Slider 上的指示器  |
|  directionNav  | boolean |  true   |  显示 Slider 上的方向指示器  |
|  prev  | Element/string |  -   |  设置前指示器内容  |
|  next  | Element/string |  -   |  设置后指示器内容  |
|  extraClassName  | string |  -  |  增加一个 className, 用以覆盖原有样式  |
|  gradient  | boolean |  false  |  图片切换效果是否为渐变效果  |
