# FocusFrame

This is a javascript library which helps you lay out responsive images by defining a 'focal point' based on image pixels that appears at an 'offset point' in its containing element

## Standard Usage

```javascript
let img = new FocusFrame ({
	src: './images/image',
	center: [0,0],
	offset: [0,0],
	filter: 'none',
	})
```
## The Future

The next step is to add smart scaling ('stretch' and 'shrink') options and make it support an existing image element.
