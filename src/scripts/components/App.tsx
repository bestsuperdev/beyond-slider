import * as React from 'react'
import {Slider,Item} from './Slider'

export default class App extends React.Component<any,any> {
	render() {
		return (
			<div className="app">
				<Slider mobile width={500} height={300} interval={2} autoPlay pauseOnAction controlNav directionNav>
					<Item key="0"><a href="http://www.baidu.com"> <img style={{width:'100%',height : '100%'}} src={require('images/c1.jpg')} /></a></Item>
					<Item key="1"><a href="http://www.baidu.com"> <img style={{width:'100%',height : '100%'}} src={require('images/c2.jpg')} /></a></Item>
					<Item key="2"><a href="http://www.baidu.com"> <img style={{width:'100%',height : '100%'}} src={require('images/c3.jpg')} /></a></Item>
					<Item key="3"><a href="http://www.baidu.com"> <img style={{width:'100%',height : '100%'}} src={require('images/c4.jpg')} /></a></Item>	
				</Slider>
						
				<Slider mobile height={300} interval={4} autoPlay={true} pauseOnAction={true} controlNav={true} directionNav={true} >
					<Item key="0"><a href="http://www.baidu.com"> <img style={{width:'100%',height : '100%'}} src={require('images/c1.jpg')} /></a></Item>
					<Item key="1"><a href="http://www.baidu.com"> <img style={{width:'100%',height : '100%'}} src={require('images/c2.jpg')} /></a></Item>
					<Item key="2"><a href="http://www.baidu.com"> <img style={{width:'100%',height : '100%'}} src={require('images/c3.jpg')} /></a></Item>
					<Item key="3"><a href="http://www.baidu.com"> <img style={{width:'100%',height : '100%'}} src={require('images/c4.jpg')} /></a></Item>
				</Slider>

				<Slider height={300} interval={4} autoPlay={true} pauseOnAction={true} controlNav={true} directionNav={true} >
					<Item key="0"><a href="http://www.baidu.com"> <img style={{width:'100%',height : '100%'}} src={require('images/c1.jpg')} /></a></Item>
					<Item key="1"><a href="http://www.baidu.com"> <img style={{width:'100%',height : '100%'}} src={require('images/c2.jpg')} /></a></Item>
					<Item key="2"><a href="http://www.baidu.com"> <img style={{width:'100%',height : '100%'}} src={require('images/c3.jpg')} /></a></Item>
					<Item key="3"><a href="http://www.baidu.com"> <img style={{width:'100%',height : '100%'}} src={require('images/c4.jpg')} /></a></Item>
				</Slider>								
			</div>
		)
	}
}
