/*
 <Slider extraClassName='' controlNav width="800" height="500" pauseOnAction interval='10'>
 {imgArr.map((img, i) => <Item key={i} link={img.link} src={img.url}>{html[i]}</Item>)}
 </Slider>
 */

const React = require('react');
// const ReactDOM = require('react-dom');

const Item = React.createClass({

    render() {
        let {link, src, children} = this.props;
        return (
            <li {...this.props}>
                {src && <a href={link || "javascript:;"} target={link ? "_blank" : ""}><img src={src} alt="图片"/></a>}
                {children && <div className="inner-html">{children}</div>}
            </li>
        );
    }
});

const Slider = React.createClass({

    getDefaultProps() {
        return {
            interval: 2,
            height: 20
        }
    },

    getInitialState() {
        this.autoChange = null;
        return {
            curIndex: 0,
            imgLen: this.props.children.length
        }
    },

    componentDidMount() {
        let {curIndex} = this.state;
        this.autoChange = this.setSliderInterval(curIndex);
    },

    // 设置定时器
    setSliderInterval(curIndex) {
        let {imgLen} = this.state;
        let {interval} = this.props;

        interval = parseInt(interval) * 1000;
        return setInterval(() => {
            if (curIndex < imgLen - 1) {
                curIndex++;
            } else {
                curIndex = 0;
            }
            //调用变换处理函数
            this.changeTo(curIndex);
        }, interval);
    },

    handlerIndexOver(curIndex) {
        clearInterval(this.autoChange);
        this.changeTo(curIndex);
    },

    handlerIndexLeave(curIndex) {
        this.autoChange = this.setSliderInterval(curIndex);
    },

    handlerIndexClick(curIndex) {
        clearInterval(this.autoChange);
        this.changeTo(curIndex);
        this.autoChange = this.setSliderInterval(curIndex);
    },

    // 变换处理函数
    changeTo(curIndex) {
        if (curIndex == this.state.curIndex) {
            return;
        }
        this.setState((props, state) => ({curIndex}));
    },

    handlerClickPrev(event) {
        event.stopPropagation();
        let {curIndex, imgLen} = this.state;

        if (curIndex == 0) {
            curIndex = imgLen - 1;
        } else {
            curIndex -= 1;
        }
        this.handlerIndexClick(curIndex)
    },

    handlerClickNext(event) {
        event.stopPropagation();
        let {curIndex, imgLen} = this.state;

        if (curIndex == imgLen - 1) {
            curIndex = 0;
        } else {
            curIndex += 1;
        }
        this.handlerIndexClick(curIndex)
    },

    render() {

        let {width, height, prev, next, extraClassName} = this.props;

        return (
            <div style={{width: width, height: height}}
                 className={`slider-wrapper ${extraClassName ? extraClassName : ''}`}>
                {this.renderSliderItem()}
                {this.renderSliderIndex()}
                {(prev || next) &&
                <div className="direction-nav">
                    <a href="#"
                       className={`slider-prev`}
                       onClick={this.handlerClickPrev}>
                        {prev}
                    </a>
                    <a href="#"
                       className={`slider-next`}
                       onClick={this.handlerClickNext}>
                        {next}
                    </a>
                </div>}
            </div>
        );
    },

    renderSliderItem() {
        let {pauseOnAction} = this.props;
        let {curIndex} = this.state;
        let children = (Array.isArray(this.props.children) ? this.props.children : [this.props.children]).filter((child) => child != null);
        children = children.map((child, i) => {
            return (
                React.cloneElement(child,
                    {
                        key: i,
                        onMouseLeave: pauseOnAction && this.handlerIndexLeave.bind(this, curIndex),
                        onMouseOver: pauseOnAction && this.handlerIndexOver.bind(this, curIndex),
                        className: i == curIndex ? 'fadeIn' : '',
                    })
            )
        });
        return <ul ref="sliderList" className="slider-list">{children}</ul>
    },

    renderSliderIndex() {
        let {imgLen, curIndex} = this.state;
        let {controlNav, width, height} = this.props;
        let indexArr = [];
        for (let i = 0; i < imgLen; i++) {
            let index = (
                <li key={i}
                    className={i == curIndex ? 'index-on' : ''}
                    onMouseOver={this.handlerIndexOver.bind(this, i)}
                    onMouseLeave={this.handlerIndexLeave.bind(this, i)}>
                </li>
            );
            indexArr.push(index);
        }
        return controlNav && <ul className="index-list" style={{width: width, height: height}}>{indexArr}</ul>
    }

});

Slider.Item = Item;
module.exports = Slider;
