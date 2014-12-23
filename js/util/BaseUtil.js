var BaseUtil = {

	getMediaQuerySize: function() {
		//DOES NOT WORK IN IE 8
		if (!BaseUI.IS_BROWSER_IE8_ORLESS) {
			var size = window.getComputedStyle(document.body, ':before').getPropertyValue('content').replace(/"/g, '');
			return size
		} else {
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