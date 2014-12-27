//#################################################################################################
// Navigation
//################################################################################################

describe('Navigation', function() {

    var $location;

    beforeEach(inject(function($injector) {
        $location = $injector.get('$location');
        var $rootScope = $injector.get('$rootScope');
        var $controller = $injector.get('$controller');

        createController = function() {
            return $controller(navigation.intialize, {
                '$scope': $rootScope
            });
        };
    }));

    //---------------------------------------------------------------------------------------------
    it('should be able to see if a page is active.', function() {
        $location.path('/suggest');

        createController();
        expect(navigation.isActive('/suggest')).toBe(true);
        expect(navigation.isActive('/')).toBe(false);
    });

});