//#################################################################################################
//base util
//#################################################################################################

describe('Base Util', function() {

	afterEach(function() {
		setFixtures('');
	});

	//---------------------------------------------------------------------------------------------
	it('should be able to perform a content test.', function() {
		expect(BaseUtil.contentTest(55.5)).toBeTruthy();
		expect(BaseUtil.contentTest('something')).toBeTruthy();
		expect(BaseUtil.contentTest('')).toBeFalsy();
		expect(BaseUtil.contentTest(undefined)).toBeFalsy();
		expect(BaseUtil.contentTest(null)).toBeFalsy();
	});
});