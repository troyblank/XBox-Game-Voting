//-------------------------------------------------------------------------------------------------
// base ui
//
// this controls general ui duties.
//
// USES:
// util/BaseUtil
//-------------------------------------------------------------------------------------------------
var baseUI = {
    initialize: function() {
        baseUI.addHoverForDesktop();
    },

    addHoverForDesktop: function() {
        if (!BaseUtil.IS_TOUCH_DEVICE) {
            $('body').addClass('hover-active');
        }
    }
}

$(document).ready(baseUI.initialize);