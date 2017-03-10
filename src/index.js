/*
 <Slider extraClassName='' controlNav width="800" height="500" pauseOnAction interval='10'>
 {imgArr.map((img, i) => <Item key={i} link={img.link} src={img.url}>{html[i]}</Item>)}
 </Slider>
 */

const React = require('react')
const classnames = require('classnames')
const prefix = 'beyond-slider'
// const ReactDOM = require('react-dom');


const Item = (props)=> <li onMouseEnter={props.onMouseEnter} onMouseLeave={props.onMouseLeave} className={classnames(props.active && `${prefix}-fadeIn`)}>{props.children}</li>

class Slider extends React.Component {
	constructor(props){
		super(props)
		this.state = {curIndex: 0}
		this.autoSlideHandle = null
		this.handlerItemLeave = this.handlerItemLeave.bind(this) 
		this.handlerItemEnter = this.handlerItemEnter.bind(this) 
	}

	componentDidMount(){
		let {autoPlay} = this.props
		if(autoPlay){
			this.handlerAutoSlide()
		}
	}

	componentDidUpdate(){
		this.componentDidMount()
	}

	getTotalItems(){
		let {children} = this.props
		if(children){
			return  Array.isArray(children) ? children.length : 1
		}else{
			return 0 
		}
	}

	getNextIndex(){
		let {curIndex} = this.state
		let {children} = this.props
		if(children){
			curIndex++
			if(curIndex >= this.getTotalItems()){
				curIndex = 0
			}
		}
		return curIndex
	}

	getPrevIndex(){
		let {curIndex} = this.state
		curIndex--
		if(curIndex < 0){
			curIndex = Math.max(this.getTotalItems()-1,0)
		}
		return curIndex
	}

	handlerStopAutoSlide(){
		clearTimeout(this.autoSlideHandle)
		this.autoSlideHandle = null
	}

	handlerAutoSlide(){
		let {interval} = this.props
		interval = Math.max(interval+1,0) * 1000
		this.handlerStopAutoSlide()
		this.autoSlideHandle = setTimeout(()=>{
			let curIndex = this.getNextIndex()
			this.setState({curIndex})
		},interval)
	}
	handlerItemEnter(){
		// console.log('enter')
		if(this.props.pauseOnAction && this.autoSlideHandle != null){
			clearTimeout(this.autoSlideHandle)
			this.autoSlideHandle = null
		}
	}

	handlerItemLeave(){
		if(this.props.autoPlay){
			this.handlerAutoSlide()
		}
	}

	handlerChange(curIndex){
		this.handlerStopAutoSlide()
		this.setState({curIndex})
	}

	handlerPrev(){
		let prev = this.getPrevIndex()
		this.handlerChange(prev)
	}
	handlerNext(){
		let next = this.getNextIndex()
		this.handlerChange(next)
	}


	render(){
		let {width, height, extraClassName} = this.props
		let style = {width,height}
		let className = classnames(prefix,extraClassName)
		return (
			<div style={style} className={className}>
				{this.renderItems()}
				{this.renderIndex()}
				{this.renderNavs()}
			</div>
		)
	}

	renderItems(){
		let {children} = this.props
		let {curIndex} = this.state
		if(children){
			children = Array.isArray(children) ? children : [children]
			let items = children.map((item,i)=>{
				return React.cloneElement(item,{
					active: i == curIndex,
					onMouseEnter : this.handlerItemEnter,
					onMouseLeave : this.handlerItemLeave
				})
			})
			
			return <ul className={`${prefix}-items`}>{items}</ul>
		}
	}
	renderIndex(){
		let {controlNav} = this.props
		if(controlNav){
			let {curIndex} = this.state
			let totalItems = this.getTotalItems()
			let indexItems = []
			for (let i = 0; i < totalItems; i++) {
				let className = classnames(i == curIndex && `${prefix}-active`)
				indexItems.push(<li key={i} className={className} onClick={this.handlerChange.bind(this, i)}></li>)
			}
			return <ul className={`${prefix}-index`} >{indexItems}</ul>
		}
	}
	renderNavs(){
		let {directionNav,prev,next} = this.props
		prev = prev || <i className={`${prefix}-back`}></i>
		next = next || <i className={`${prefix}-next`}></i>
		if(directionNav){
			return (
				<div className={`${prefix}-direction-navs`}>
					<span href="#" className={`${prefix}-direction-prev`} onClick={this.handlerPrev.bind(this)}>{prev}</span>
					<span href="#" className={`${prefix}-direction-next`} onClick={this.handlerNext.bind(this)}>{next}</span>
				</div>
			)
		}

	}
}



export default Slider

export {Item}