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
	// VALIDATION
	//---------------------------------------------------------------------------------------------
	contentTest: function(value) {
		if (value === null || value === undefined) {
			return false;
		}
		return (/\S/.test(value));
	}
}


//---------------------------------------------------------------------------------------------
// IE 8 Fixes
//---------------------------------------------------------------------------------------------
if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function(elt /*, from*/ ) {
		var len = this.length >>> 0;

		var from = Number(arguments[1]) || 0;
		from = (from < 0) ? Math.ceil(from) : Math.floor(from);
		if (from < 0)
			from += len;

		for (; from < len; from++) {
			if (from in this &&
				this[from] === elt)
				return from;
		}
		return -1;
	};
}