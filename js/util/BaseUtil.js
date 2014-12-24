var BaseUtil = {

	IS_TOUCH_DEVICE: !!('ontouchstart' in window),

	getMediaQuerySize: function() {
		try {
			var size = window.getComputedStyle(document.body, ':before').getPropertyValue('content').replace(/"/g, '');
			return size
		} catch (e) {
			return 'desktop';
		}
	},

	//---------------------------------------------------------------------------------------------
	//VALIDATION
	//---------------------------------------------------------------------------------------------
	contentTest: function(value) {
		if (value === null || value === undefined) {
			return false;
		}
		return (/\S/.test(value));
	}
}