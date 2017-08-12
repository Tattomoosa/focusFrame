import ResizeSensor from "../node_modules/css-element-queries/src/ResizeSensor"

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
			, stretch : false
			}

		this.props = Object.assign({}, defaultProps, props)
		this._propsOnLastRender = Object.assign({}, props) 
		if (this.validateProps(props)) {
			this.init()
			}

		}

	render() {
		this.initImage()
		}

	init() {
		this.initElementStyle()
		this.render()
		this.onResize()
		}

	checkForChanges() {
		//check to see if defaultProps is equivalent to propsOnLastRender
		return true
		}

	initElementStyle() {
		this.props.element.style.overflow = 'hidden'
		this.props.element.style.position = 'relative'
		}

	initImage() {
		let img = this.props.img
		if (img.loaded) {this.placeImage()} else {
		console.log('init')
		img.src = this.props.src
		img.onload = (function() {
			this.placeImage()
			this.props.img.loaded = true
			}).bind(this)
		this.props.element.appendChild(img)
		img.style.position = 'absolute'
		}
		}

	placeImage() {
		//image placement logic follows...
		let img = this.props.img
		let [elWidth, elHeight] = this.getElementDimensions(this.props.element)

		//let [imgWidth, imgHeight] = this.getElementDimensions(img)
		let [imgWidth, imgHeight] = [img.naturalWidth, img.naturalHeight]
		let imgScale = img.height/img.naturalHeight

		console.log ({elWidth: elWidth, elHeight: elHeight,natHeight: img.naturalHeight, curHeight: img.height, scale: imgScale})

		//center on
		let x = parseInt (elWidth)/2 - this.props.focus.x * imgScale
		let y = parseInt (elHeight)/2 - this.props.focus.y * imgScale
		console.log('pre-stretch', {x:x, y:y})

		//offset by
		x += this.props.offset.x
		y += this.props.offset.y

		//if stretch is true we force the image to take up all available space
			// /*
		// if (this.props.stretch) {
		// 	console.log ({x:x, y:y})
		// 	if ( x > 0 || y > 0 ) {
		// 		if ( x > y ) {
		// 			imgWidth  += x*4
		// 			//imgScale = img.height/img.naturalHeight
		// 			img.style.width = imgWidth + 'px'
		// 			img.style.height = 'auto'
		// 			//imgScale = img.naturalWidth / img.width
		// 			y -= x * imgScale
		// 			x = 0
		// 			}
		// 		else {
		// 			imgHeight  += y*4
		// 			img.style.height = imgHeight + 'px'
		// 			img.style.width = 'auto'
		// 			//imgScale = img.naturalHeight / img.height
		// 			x -= y * imgScale
		// 			y = 0
		// 			}
		// 		}
		// 	if ( x + imgWidth < elWidth || y + imgHeight < elHeight ) {
		// 		if (x > y) {
		// 			let dif = elWidth - imgWidth
		// 			imgWidth += dif*4
		// 			img.style.width = imgWidth + 'px'
		// 			img.style.height = 'auto'
		// 			x -= dif*2*imgScale
		// 			}
		// 		else {
		// 			let dif = elWidth - imgWidth
		// 			imgHeight += dif*4
		// 			img.style.height = imgWidth + 'px'
		// 			img.style.width = 'auto'
		// 			x -= dif*2*imgScale
		// 			}
		// 		}
		// 	}
			// */

		img.style.left = x
		img.style.top = y

		}

	onResize() {
		new ResizeSensor(this.props.element, (function() {
			this.render()
			}).bind(this))
	}

	getElementDimensions(element) {
		let w, h

		w = window.getComputedStyle(element).getPropertyValue('width')
		h = window.getComputedStyle(element).getPropertyValue('height')

		return [w,h]
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

// let doggo = new FocusFrame({
// 	src : './demo/images/cooldog.jpg'
// 	, element : document.getElementById('image2')
// 	, focus : {x: 240, y: 320}
// 	//	, offset : {x: 50, y: 50}
// 	, stretch : true
// });

let grid = new FocusFrame({
	src : './demo/images/grid.png'
	, element : document.getElementById('image')
	, focus : {x: 209, y: 211}
	//	, offset : {x: 50, y: 50}
	, stretch : true
});
