'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 <Slider extraClassName='' controlNav width="800" height="500" pauseOnAction interval='10'>
 {imgArr.map((img, i) => <Item key={i} link={img.link} src={img.url}>{html[i]}</Item>)}
 </Slider>
 */

var React = require('react');
var classnames = require('classnames');
var prefix = 'beyond-slider';
// const ReactDOM = require('react-dom');


var Item = function Item(props) {
	return React.createElement(
		'li',
		{ onMouseEnter: props.onMouseEnter, onMouseLeave: props.onMouseLeave, className: classnames(props.active && prefix + '-fadeIn') },
		props.children
	);
};

var Slider = function (_React$Component) {
	_inherits(Slider, _React$Component);

	function Slider(props) {
		_classCallCheck(this, Slider);

		var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

		_this.state = { curIndex: 0 };
		_this.autoSlideHandle = null;
		_this.handlerItemLeave = _this.handlerItemLeave.bind(_this);
		_this.handlerItemEnter = _this.handlerItemEnter.bind(_this);
		return _this;
	}

	Slider.prototype.componentDidMount = function componentDidMount() {
		var autoPlay = this.props.autoPlay;

		if (autoPlay) {
			this.handlerAutoSlide();
		}
	};

	Slider.prototype.componentDidUpdate = function componentDidUpdate() {
		this.componentDidMount();
	};

	Slider.prototype.getTotalItems = function getTotalItems() {
		var children = this.props.children;

		if (children) {
			return Array.isArray(children) ? children.length : 1;
		} else {
			return 0;
		}
	};

	Slider.prototype.getNextIndex = function getNextIndex() {
		var curIndex = this.state.curIndex;
		var children = this.props.children;

		if (children) {
			curIndex++;
			if (curIndex >= this.getTotalItems()) {
				curIndex = 0;
			}
		}
		return curIndex;
	};

	Slider.prototype.getPrevIndex = function getPrevIndex() {
		var curIndex = this.state.curIndex;

		curIndex--;
		if (curIndex < 0) {
			curIndex = Math.max(this.getTotalItems() - 1, 0);
		}
		return curIndex;
	};

	Slider.prototype.handlerStopAutoSlide = function handlerStopAutoSlide() {
		clearTimeout(this.autoSlideHandle);
		this.autoSlideHandle = null;
	};

	Slider.prototype.handlerAutoSlide = function handlerAutoSlide() {
		var _this2 = this;

		var interval = this.props.interval;

		interval = Math.max(interval + 1, 0) * 1000;
		this.handlerStopAutoSlide();
		this.autoSlideHandle = setTimeout(function () {
			var curIndex = _this2.getNextIndex();
			_this2.setState({ curIndex: curIndex });
		}, interval);
	};

	Slider.prototype.handlerItemEnter = function handlerItemEnter() {
		// console.log('enter')
		if (this.props.pauseOnAction && this.autoSlideHandle != null) {
			clearTimeout(this.autoSlideHandle);
			this.autoSlideHandle = null;
		}
	};

	Slider.prototype.handlerItemLeave = function handlerItemLeave() {
		if (this.props.autoPlay) {
			this.handlerAutoSlide();
		}
	};

	Slider.prototype.handlerChange = function handlerChange(curIndex) {
		this.handlerStopAutoSlide();
		this.setState({ curIndex: curIndex });
	};

	Slider.prototype.handlerPrev = function handlerPrev() {
		var prev = this.getPrevIndex();
		this.handlerChange(prev);
	};

	Slider.prototype.handlerNext = function handlerNext() {
		var next = this.getNextIndex();
		this.handlerChange(next);
	};

	Slider.prototype.render = function render() {
		var _props = this.props,
		    width = _props.width,
		    height = _props.height,
		    extraClassName = _props.extraClassName;

		var style = { width: width, height: height };
		var className = classnames(prefix, extraClassName);
		return React.createElement(
			'div',
			{ style: style, className: className },
			this.renderItems(),
			this.renderIndex(),
			this.renderNavs()
		);
	};

	Slider.prototype.renderItems = function renderItems() {
		var _this3 = this;

		var children = this.props.children;
		var curIndex = this.state.curIndex;

		if (children) {
			children = Array.isArray(children) ? children : [children];
			var items = children.map(function (item, i) {
				return React.cloneElement(item, {
					active: i == curIndex,
					onMouseEnter: _this3.handlerItemEnter,
					onMouseLeave: _this3.handlerItemLeave
				});
			});

			return React.createElement(
				'ul',
				{ className: prefix + '-items' },
				items
			);
		}
	};

	Slider.prototype.renderIndex = function renderIndex() {
		var controlNav = this.props.controlNav;

		if (controlNav) {
			var curIndex = this.state.curIndex;

			var totalItems = this.getTotalItems();
			var indexItems = [];
			for (var i = 0; i < totalItems; i++) {
				var className = classnames(i == curIndex && prefix + '-active');
				indexItems.push(React.createElement('li', { key: i, className: className, onClick: this.handlerChange.bind(this, i) }));
			}
			return React.createElement(
				'ul',
				{ className: prefix + '-index' },
				indexItems
			);
		}
	};

	Slider.prototype.renderNavs = function renderNavs() {
		var _props2 = this.props,
		    directionNav = _props2.directionNav,
		    prev = _props2.prev,
		    next = _props2.next;

		prev = prev || React.createElement('i', { className: prefix + '-back' });
		next = next || React.createElement('i', { className: prefix + '-next' });
		if (directionNav) {
			return React.createElement(
				'div',
				{ className: prefix + '-direction-navs' },
				React.createElement(
					'span',
					{ href: '#', className: prefix + '-direction-prev', onClick: this.handlerPrev.bind(this) },
					prev
				),
				React.createElement(
					'span',
					{ href: '#', className: prefix + '-direction-next', onClick: this.handlerNext.bind(this) },
					next
				)
			);
		}
	};

	return Slider;
}(React.Component);

Slider.defaultProps = {
	autoPlay: true,
	pauseOnAction: true,
	directionNav: true,
	controlNav: true,
	interval: 2,
	height: 400
};

exports['default'] = Slider;
exports.Item = Item;