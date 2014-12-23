//-------------------------------------------------------------------------------------------------
//JASMINE HELPERS v 1.0.0 | reusable code for helping with jasmine testing.
//-------------------------------------------------------------------------------------------------
var jasminTestHelper = {

    spyOnValAndFake: function(obj) {
        var i, j;
        spyOn($.fn, 'val').and.callFake(function() {
            for (i = 0, j = obj.length; i < j; i++) {
                if (this.selector === obj[i][0]) {
                    return obj[i][1];
                }
            }
        })
    }
}