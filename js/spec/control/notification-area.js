//#################################################################################################
// Game List
//################################################################################################

describe('Notification Area', function() {

    beforeEach(module("game-voter"));

    beforeEach(inject(function($injector) {
        var $rootScope = $injector.get('$rootScope');
        var $compile = $injector.get('$compile');
        var $controller = $injector.get('$controller');

        createController = function() {
            return $controller(notificationArea.intialize, {
                '$scope': $rootScope
            });
        };
    }));

    afterEach(function() {
        setFixtures('');
    });

    //---------------------------------------------------------------------------------------------
    it('should be able to update status.', function() {
        spyOn(notificationArea, 'updateStatus');

        createController();

        expect(notificationArea.updateStatus).toHaveBeenCalled();
    });

});