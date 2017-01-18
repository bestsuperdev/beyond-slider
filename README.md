# Slider
图片轮播组件

#用法

```
var Slider = require('@best/360hitao-components/lib/Slider')
require('@best/360hitao-components/css/Slider.css')
var Item = Slider.Item;

<Slider controlNav width="800" height="500" extraClassName=''>
	{imgArr.map((img, i) => <Item key={i} link={img.link} src={img.url}>{html[i]}</Item>)}
</Slider>

<Slider controlNav width="800" height="500" prev={<span>&lt;</span>}
next={<span>&gt;</span>}>
	{imgArr.map((img, i) => <Item key={i} link={img.link} src={img.url}>{html[i]}</Item>)}
</Slider>

<Slider controlNav width="800" height="500" pauseOnAction interval='10'>
	{imgArr.map((img, i) => <Item key={i} link={img.link} src={img.url}>{html[i]}</Item>)}
</Slider>

```


#Slider 属性

| 名称        | 类型   |  默认值  |  说明  |
| :-----------: | :------: | :------: | :------: |
|  width  | Number/String |  100%   |  设置 Slider 宽度  |
|  height  | Number/String |  100%   |  设置 Slider 高度  |
|  interval  | Number/String |  3  |  设置轮播的时间间隔,单位为秒  |
|  pauseOnAction  | Boolean |  false  |  设置鼠标悬停时是否停止轮播  |
|  controlNav  | Boolean |  false   |  显示 Slider 上的指示器  |
|  prev  | Element/String |  -   |  设置前指示器内容  |
|  next  | Element/String |  -   |  设置后指示器内容  |
|  extraClassName  | String |  -  |  增加一个 className, 用以覆盖原有样式  |

#Item 属性

| 名称        | 类型   |  默认值  |  说明  |
| :-----------: | :------: | :------: | :------: |
|  link  | URL |  -   |  设置轮播内容跳转链接  |
|  src  | URL |  -   |  设置轮播显示图片  |
