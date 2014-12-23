//#################################################################################################
//self
//#################################################################################################

describe('Self', function() {

    afterEach(function() {
        setFixtures('');
    });

    //---------------------------------------------------------------------------------------------
    it('should be using jasmine 2 or above.', function() {
        spyOn(BaseUtil, 'contentTest').and.callFake(function() {
            //just a jasmine 2 sanity check
            expect(true).toBe(true);
        });
    });

    // ---------------------------------------------------------------------------------------------
    it('should be able to use fixtures.', function() {
        //this relies on jasmine-jquery
        setFixtures('<div class="some-element"></div>');
        expect($('.some-element').length).toEqual(1);
    });

    //---------------------------------------------------------------------------------------------
    it('should be able to mock DOM calls.', function() {
        var domList = ['a', 'b'];
        var value2 = 'value2';
        jasminTestHelper.spyOnValAndFake([
            ['#id', domList],
            ['.class', value2]
        ]);

        var result = $('#id').val();
        var result2 = $('.class').val();

        expect(result).toEqual(domList);
        expect(result).not.toEqual(undefined);
        expect(result).not.toEqual(null);
        expect(result2).toEqual(value2);
        expect(result2).not.toEqual(domList);
    });

});