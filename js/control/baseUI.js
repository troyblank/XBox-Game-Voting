//-------------------------------------------------------------------------------------------------
// base ui
//
// this controls general ui duties.
//
// USES:
// BaseUtil
//
//-------------------------------------------------------------------------------------------------
var baseUI = {
    initialize: function() {
        baseUI.addHoverForDesktop();
    },

    addHoverForDesktop: function() {
        if (BaseUtil.getMediaQuerySize() == 'desktop') {
            $('body').addClass('hover-active');
        }
    }
}


$(document).ready(baseUI.initialize);