'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FocusFrame = function () {
	function FocusFrame(props) {
		_classCallCheck(this, FocusFrame);

		// default values
		var defaultProps = {
			focus: { x: 0, y: 0 },
			offset: { x: 0, y: 0 },
			filter: 'none',
			element: null,
			img: new Image(),
			src: null,
			repeat: { x: false, y: false }
		};

		this.props = Object.assign({}, defaultProps, props);
		if (this.validateProps(props)) {
			this.initElementStyle();
			this.initImage();
			this.render();
			this.onResize();
		}
	}

	_createClass(FocusFrame, [{
		key: 'render',
		value: function render() {
			this.getElementDimensions();
			this.placeImage();
		}
	}, {
		key: 'initElementStyle',
		value: function initElementStyle() {
			this.props.element.style.overflow = 'hidden';
			this.props.element.style.position = 'relative';
		}
	}, {
		key: 'initImage',
		value: function initImage() {
			var img = this.props.img;

			img.src = this.props.src;
			this.props.element.appendChild(img);
			img.style.position = 'absolute';
		}
	}, {
		key: 'placeImage',
		value: function placeImage() {
			var img = this.props.img;

			//center on
			var x = parseInt(this.props.element.width) / 2 - this.props.focus.x;
			var y = parseInt(this.props.element.height) / 2 - this.props.focus.y;
			//offset by
			x += this.props.offset.x;
			y += this.props.offset.y;

			img.style.left = x;
			img.style.top = y;
		}
	}, {
		key: 'onResize',
		value: function onResize() {
			//let count = 0;
			//let countTo = 20;
			// window.addEventListener('resize', (function() {;
			// 	this.render();
			// }).bind(this));
			new ResizeSensor(this.props.element, function () {
				this.render();
			}.bind(this));
		}
	}, {
		key: 'getElementDimensions',
		value: function getElementDimensions() {
			this.props.element.height = window.getComputedStyle(this.props.element).getPropertyValue('height');
			this.props.element.width = window.getComputedStyle(this.props.element).getPropertyValue('width');
			console.log(this.props.element.width, this.props.element.height);
		}
	}, {
		key: 'validateProps',
		value: function validateProps(props) {
			//killer validation, brah
			var element = props.element;

			if (typeof element === 'undefined') {
				console.error('FocusFrame needs a valid DOM element');
				return false;
			}
			return true;
		}
	}]);

	return FocusFrame;
}();

var doggo = new FocusFrame({
	src: './demo/images/cooldog.jpg',
	element: document.getElementById('image'),
	focus: { x: 240, y: 320 }
});