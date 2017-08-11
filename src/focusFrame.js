
class FocusFrame {
	constructor (props) {

		// default values
		let defaultProps = {
			focus : {x: 0, y: 0}
			, offset : {x:0, y:0}
			, filter : 'none'
			, element : null
			, img : new Image()
			, src : null
			, repeat : {x: false, y: false}
			}

		this.props = Object.assign({}, defaultProps, props)
		if (this.validateProps(props)) {
			this.initElementStyle()
			this.initImage()
			this.render()
			this.onResize()
			}

		}

	render() {
		this.getElementDimensions()
		this.placeImage()
		}

	initElementStyle() {
		this.props.element.style.overflow = 'hidden'
		this.props.element.style.position = 'relative'

		}

	initImage() {
		let img = this.props.img

		img.src = this.props.src
		this.props.element.appendChild(img)
		img.style.position = 'absolute'

		}

	placeImage() {
		let img = this.props.img

		//center on
		let x = parseInt (this.props.element.width)/2 - this.props.focus.x
		let y = parseInt (this.props.element.height)/2 - this.props.focus.y
		//offset by
		x += this.props.offset.x
		y += this.props.offset.y

		img.style.left = x
		img.style.top = y
		}

	onResize() {
		//let count = 0;
		//let countTo = 20;
		// window.addEventListener('resize', (function() {;
		// 	this.render();
		// }).bind(this));
		new ResizeSensor(this.props.element, (function() {
			this.render()
			}).bind(this))
	}

	getElementDimensions () {
		this.props.element.height = window.getComputedStyle(this.props.element).getPropertyValue('height')
		this.props.element.width = window.getComputedStyle(this.props.element).getPropertyValue('width')
		console.log (this.props.element.width, this.props.element.height)
		}

	validateProps (props) {
		//killer validation, brah
		let {element} = props
		if (typeof element === 'undefined') {
			console.error ('FocusFrame needs a valid DOM element')
			return false
			}
		return true
		}
}

let doggo = new FocusFrame({
	src : './demo/images/cooldog.jpg'
	, element : document.getElementById('image')
	, focus : {x: 240, y: 320}
});
