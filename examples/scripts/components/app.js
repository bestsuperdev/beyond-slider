require('styles/index.less')
const React = require('react')
// const Slider = require('src/index');
// const Item = Slider.Item;
import Slider,{Item} from 'src/index'

export default class App extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {

		return (
			<div className='app'>
				<Slider  height={500}>
					<Item key="0"><a href="http://www.baidu.com"> <img style={{width : '100%',height : '100%'}} src={require('images/c1.jpg')} /></a></Item>
					<Item key="1"><a href="http://www.baidu.com"> <img style={{width : '100%',height : '100%'}} src={require('images/c2.jpg')} /></a></Item>
					<Item key="2"><a href="http://www.baidu.com"> <img style={{width : '100%',height : '100%'}} src={require('images/c3.jpg')} /></a></Item>
					<Item key="3"><a href="http://www.baidu.com"> <img style={{width : '100%',height : '100%'}} src={require('images/c4.jpg')} /></a></Item>
				</Slider>
			</div>
		)
	}
}