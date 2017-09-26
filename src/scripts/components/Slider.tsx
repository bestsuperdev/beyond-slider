/*
 <Slider extraClassName='' controlNav width="800" height="500" pauseOnAction interval='10'>
 {imgArr.map((img, i) => <Item key={i} link={img.link} src={img.url}>{html[i]}</Item>)}
 </Slider>
 */

// const React = require('react')
// const classnames = require('classnames')
// const prefix = 'beyond-slider'
// const ReactDOM = require('react-dom');
import * as React from 'react'
import * as ReactDom from 'react-dom'
import * as classnames from 'classnames'
// var $ = require('jquery')
const prefix = 'beyond-slider'
const Item = (props:any)=> {
	return <li style={{width:props.Width}} onMouseEnter={props.onMouseEnter} onMouseLeave={props.onMouseLeave} className={classnames(props.active && `${prefix}-fadeIn`)}>{props.children}</li>//className={classnames(props.active && `${prefix}-fadeIn`)}
}
interface SliderProps{
    extraClassName?:string,
    autoPlay?: boolean,
    pauseOnAction?: boolean,
    directionNav ?: boolean,  
    controlNav ?: boolean,
    interval ?: number,
    width?:number,
    height ?: number,
    prev?:string | JSX.Element,
    next?:string | JSX.Element,

	mobile?:boolean
}
interface CSSStyle{
    width?:number,
    transform?:string, 
    left?:string,
	transition?:string

}
interface SliderState{
    curIndex?:number,
	prevIndex?:number,
    Style?: CSSStyle
}
interface coord{
	X:number,
	Y:number
}
class Slider extends React.Component<SliderProps,SliderState> {
     static defaultProps:SliderProps ={
        autoPlay : true,
        pauseOnAction : true,
        directionNav :true,  
        controlNav : true,
        interval : 2,
        height : 400
    }   
	constructor(props:SliderProps){
		super(props)
		this.state = {curIndex: 0,prevIndex:0,Style:{}}
		this.autoSlideHandle = null
		this.handlerItemLeave = this.handlerItemLeave.bind(this) 
		this.handlerItemEnter = this.handlerItemEnter.bind(this) 
		this.childrenLength = 0
		this.timer = null
		this.mountFlag = false
	}
    public autoSlideHandle:any
	public touchStartCoordX:any
	public touchStartCoordY:any
	public touchFlag:boolean
	public childrenLength:number
	public boxWidth:number
	public timer:any
	public mountFlag:boolean
	public count:number
	getBoxWidth(){
		let box = ReactDom.findDOMNode(this)
        this.boxWidth = box.clientWidth	
	}	
	resizeWith(){
		// this.handlerStopAutoSlide()
		// clearTimeout(this.timer)
		// this.timer = null
		this.getBoxWidth()
		let {curIndex,prevIndex} =this.state
		let finLeft = -(curIndex+1)*this.boxWidth
		if(curIndex == 0){
			finLeft = -(this.childrenLength+1)*this.boxWidth
		}
		this.quickMove1(finLeft,prevIndex,curIndex)	
        this.handlerAutoSlide()			
	}
	getPrev(){
		let {prevIndex} = this.state
		let curIndex = prevIndex-1
		if(curIndex < 0){
			curIndex = this.childrenLength -1
		}
		return curIndex
	}

	getNext(){
		let {prevIndex} = this.state
		let curIndex = prevIndex+1
		if(curIndex > this.childrenLength -1){
			curIndex = 0
		}	
		return curIndex	
	}		
	setStyle(width:number,positionX:number,time:number){
		// let style = {width:0,left:'',transform:'',transitionDuration:'0s',transitionProperty:'',backfaceVisibility:'',transitionTimingFunction:''}
		let style = {width:0,left:'',transform:'',transition:''}		
		style.width = width
		style.transform ='translate3d('+positionX+'px, 0px, 0px)'
		if(time == 0){
			style.transition ='none'
		}else{
			style.transition = time*1000+'ms'
		}
		return style

	}
	componentDidMount(){
		if(this.childrenLength == 1){
			this.handlerStopAutoSlide()
			return
		}
		 if(this.props.autoPlay){
			// this.mountFlag = true
			this.getBoxWidth()
            this.handlerAutoSlide()
			
        }
		if(this.props.mobile && !this.props.width)		
			window.addEventListener('resize',this.resizeWith.bind(this))
		let box = ReactDom.findDOMNode(this)
		box.addEventListener('touchstart',this.handlerTouchStart.bind(this))
		box.addEventListener('touchmove',this.handlerTouchMove.bind(this))
	}

	componentDidUpdate(){
		this.getBoxWidth()	
		if(this.childrenLength == 1){
			this.handlerStopAutoSlide()
			return
		}
		if(this.props.autoPlay){
			this.getBoxWidth()
			this.handlerStopAutoSlide()
            this.handlerAutoSlide()			
		}
	}

	componentWillUnmount(){
		this.handlerStopAutoSlide()
		if(this.props.mobile && !this.props.width)
			window.removeEventListener('resize',this.resizeWith.bind(this))
		let box = ReactDom.findDOMNode(this)
		box.removeEventListener('touchstart',this.handlerTouchStart.bind(this))
		box.removeEventListener('touchmove',this.handlerTouchMove.bind(this))		
	}

	handlerStopAutoSlide(){
		clearTimeout(this.autoSlideHandle)
		this.autoSlideHandle = null
	}

	handlerAutoSlide(){
		let {interval} = this.props
		interval = interval*1000
        if(this.props.autoPlay){
			if(this.autoSlideHandle == null)
            	this.autoSlideHandle = setTimeout(this.handlerNext.bind(this),interval)
        }		
	}

	handlerItemEnter(){
		if(this.props.pauseOnAction && this.autoSlideHandle != null){
			this.handlerStopAutoSlide()
		}
	}

	handlerItemLeave(){
		if(this.props.autoPlay){
			this.handlerAutoSlide()
		}
	}

	quickMove1(finLeft:number,prevIndex:number,curIndex:number){
		let Style = this.setStyle((this.childrenLength+2)*this.boxWidth,finLeft,0)
		this.setState({Style,prevIndex,curIndex})
	}

    animate(curIndex:number,nextIndex:number,sliderTime:number,direction:number,isClick:boolean){//用样式来写动画
        let finLeft
        let Style
		// if(curIndex == 0)debugger
		let prevIndex = nextIndex
		if((isClick && curIndex == 0) ||((!isClick)&&((direction == 1 && curIndex == 0)||(direction == -1 && curIndex == 0)))){
			finLeft = -1*this.boxWidth
			this.quickMove1(finLeft,prevIndex,nextIndex)
		}else if((isClick && curIndex == this.childrenLength -1) ||((!isClick)&&((direction == 1 && curIndex == this.childrenLength -1)||(direction == -1 && curIndex == this.childrenLength-1)))){
			finLeft = -this.childrenLength*this.boxWidth
			// debugger
			this.quickMove1(finLeft,prevIndex,nextIndex)
		}
        let OrigFinLeft = -(nextIndex+1)*this.boxWidth
		if(!isClick){
			if(curIndex == this.childrenLength-1 && nextIndex == 0 && direction == 1){
				OrigFinLeft = -(this.childrenLength+1)*this.boxWidth
			}else if(curIndex == 0 && nextIndex == this.childrenLength -1  && direction == -1){
				OrigFinLeft = 0
			}
		}		
		Style = this.setStyle((this.childrenLength+2)*this.boxWidth,OrigFinLeft,sliderTime)
		// this.setState({Style:Style1,prevIndex,curIndex:nextIndex})		
		this.timer = setTimeout(this.delayRender.bind(this),10,Style,prevIndex,nextIndex) 
		   
    }

    delayRender(Style:CSSStyle,prevIndex:number,nextIndex:number){
		// debugger
		if(this.timer != null){
			this.setState({Style,prevIndex,curIndex:nextIndex})
			clearInterval(this.timer)
			this.timer = null
		}
    }

	handlerChange(curIndex:number,prevIndex?:number){
        // debugger
        this.handlerStopAutoSlide()
        if( prevIndex!= undefined && prevIndex == curIndex) return 
		if(this.props.mobile){
			let direction = 1
			if(curIndex < prevIndex) direction = -1
			this.animate(prevIndex,curIndex,0.3,direction,true)
		}else{
			this.setState({curIndex,prevIndex:curIndex})
		}

	}

	handlerPrev(){
		this.handlerStopAutoSlide()
        let {prevIndex} = this.state
		let curIndex = this.getPrev()
        if(this.props.mobile){
			this.animate(prevIndex,curIndex,0.3,-1,false)
        }else{
            this.handlerChange(curIndex)         
        }      	
	}

	handlerNext(){
		this.handlerStopAutoSlide()
        let {prevIndex} = this.state
		let curIndex = this.getNext()
        if(this.props.mobile){
            this.animate(prevIndex,curIndex,0.3,1,false)
        }else{
            this.handlerChange(curIndex)      
        }
	}

	handlerTouchStart(event:any){
		event.stopPropagation()
		this.touchFlag = true
		// console.log(event.changedTouches)
		this.touchStartCoordX = event.changedTouches[0].pageX
		this.touchStartCoordY = event.changedTouches[0].pageY
	}

	handlerTouchMove(event:any){
        // debugger
		event.preventDefault()
		event.stopPropagation()
		if(this.touchFlag == true){
			this.touchFlag = false
			let disX = event.changedTouches[0].pageX -this.touchStartCoordX
			let disY = event.changedTouches[0].pageY -this.touchStartCoordY
			if(Math.abs(disX) > Math.abs(disY)){
				if(disX > 0){	
					this.handlerPrev()	//向右滑			
				}else {	
					this.handlerNext()	//向左滑
				}	
			}		
		}	
	}

	render(){
		let {width, height, extraClassName} = this.props
		// console.log(width)
		let style = {width,height}
		let className = classnames(prefix,extraClassName)//onTouchStart={this.handlerTouchStart.bind(this)} onTouchMove={this.handlerTouchMove.bind(this)} 
		return(
			<div className={className}  style={style} >
				{this.renderItems()}
				{this.renderIndex()}
				{this.renderNavs()}
			</div>
		)
	}
	createItem(item:any,key:string | number,index:number){
		let itemUnit =React.cloneElement(item,{
						key:key,
						active: index == this.state.curIndex,
						onMouseEnter : this.handlerItemEnter,
						onMouseLeave : this.handlerItemLeave,
						Width:this.boxWidth
					})
		return itemUnit
	}

	renderItems(){
		// debugger
		let {width} = this.props
		let {curIndex,Style} = this.state
        let children = (Array.isArray(this.props.children) ? this.props.children : [this.props.children]).filter((child)=> child != null)
		this.childrenLength = children.length
		if(children && this.props.mobile && this.boxWidth){
			let items:any[] = []
			let firstItem:any
			children.map((item:any,i:any)=>{
				let itemUnit = this.createItem(item,i,i)
				items.push(itemUnit)
				if(i == children.length -1){
					items.unshift(this.createItem(item,-1,i))
					items.push(firstItem)
				}else if(i == 0){
					firstItem = this.createItem(item,this.childrenLength,i)
				}
			})
			return <ul style={{ width:this.boxWidth*(this.childrenLength+2),
								WebkitTransform:Style && Style.transform,
								transition:Style.transition
								}} 
						className={`${prefix}-items-mobile`}>{items}</ul>
		}else{
		// debugger
			let items = children.map((item:any,i:any)=>{
				return this.createItem(item,i,i)
			})				
			return <ul className={`${prefix}-items`}>{items}</ul>
		}		
	}

	renderIndex(){		
		let {controlNav} = this.props
		if(controlNav && this.childrenLength > 1){
			let {curIndex} = this.state
			// console.log(curIndex)			
			let totalItems = this.childrenLength
			let indexItems = []
			for (let i = 0; i < totalItems; i++) {
				let className = classnames(i == curIndex && `${prefix}-active`)
				indexItems.push(<li key={i} className={className} onClick={this.handlerChange.bind(this,i,this.state.curIndex)}></li>)	
			}
			return <ul className={`${prefix}-index`} >{indexItems}</ul>
		}
	}

    isMobile(){
        let sUserAgent = navigator.userAgent.toLowerCase()  
        let bIsIpad = sUserAgent.match(/ipad/i)?sUserAgent.match(/ipad/i).toLocaleString() == "ipad":false
        let bIsIphoneOs = sUserAgent.match(/iphone os/i)?sUserAgent.match(/iphone os/i).toLocaleString() == "iphone os":false
        let bIsMidp = sUserAgent.match(/midp/i)?sUserAgent.match(/midp/i).toLocaleString() == "midp":false  
        let bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i)?sUserAgent.match(/rv:1.2.3.4/i).toLocaleString() == "rv:1.2.3.4" :false
        let bIsUc = sUserAgent.match(/ucweb/i)?sUserAgent.match(/rv:1.2.3.4/i).toLocaleString() == "ucweb":false
        let bIsAndroid = sUserAgent.match(/android/i)?sUserAgent.match(/android/i).toLocaleString() == "android" :false
        let bIsCE = sUserAgent.match(/windows ce/i)?sUserAgent.match(/windows ce/i).toLocaleString() == "windows ce":false 	
        let bIsWM = sUserAgent.match(/windows mobile/i)?sUserAgent.match(/windows mobile/i).toLocaleString() == "windows mobile" :false
		let bIsWindowsPhone = sUserAgent.match(/windows phone/i)?sUserAgent.match(/windows phone/i).toLocaleString() == "windows phone":false
		let bIsMobile = sUserAgent.match(/mobile/i)?sUserAgent.match(/mobile/i).toLocaleString() == "mobile":false  
        if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM || bIsWindowsPhone || bIsMobile) {  
            // console.log('移动端')
            return true
        } else {  
            // console.log('PC端') 
            return false 
         } 
    }
	renderNavs(){
		let {directionNav,prev,next} = this.props
		if(this.isMobile() || this.childrenLength <= 1){directionNav = false}
        prev = prev || (<i className={`${prefix}-back`}></i>)
        next = next || (<i className={`${prefix}-next`}></i>)
		// console.log(prev)
		if(directionNav){
			return (
				<div className={`${prefix}-direction-navs`} >
					<span className={`${prefix}-direction-prev`} onClick={this.handlerPrev.bind(this)}>{prev}</span>
                    <span className={`${prefix}-direction-next`} onClick={this.handlerNext.bind(this)}>{next}</span>
				</div>
			)
		}

	}
}
export {Slider,Item}