# beyond-slider

React 轮播组件

## 用法

```jsx
require('beyond-slider/lib/index.css')
import Slider , {Item} from 'beyond-slider'

<Slider  height={500}>
	<Item key="0">
		<a href="http://www.baidu.com"> <img style={{width : '100%',height : '100%'}} src={require('images/c1.jpg')} /></a>
	</Item>
	<Item key="1">
		<a href="http://www.baidu.com"> <img style={{width : '100%',height : '100%'}} src={require('images/c2.jpg')} /></a>
	</Item>
	<Item key="2">
		<a href="http://www.baidu.com"> <img style={{width : '100%',height : '100%'}} src={require('images/c3.jpg')} /></a>
	</Item>
	<Item key="3">
		<a href="http://www.baidu.com"> <img style={{width : '100%',height : '100%'}} src={require('images/c4.jpg')} /></a>
	</Item>
</Slider>
11111111111111111111
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
