//#################################################################################################
// Add Game
//################################################################################################

describe('Add Game', function() {

    var data = true;
    var title = 'Mega Man';

    beforeEach(module("game-voter"));

    beforeEach(inject(function($injector) {
        var $rootScope = $injector.get('$rootScope');
        var $compile = $injector.get('$compile');
        var $controller = $injector.get('$controller');

        //Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');

        var authRequestHandler = $httpBackend.when('JSONP', DataUtil.getAddGameEndPoint(title)).respond(data);

        createController = function() {
            return $controller(addGame.intialize, {
                '$scope': $rootScope
            });
        };
    }));

    afterEach(function() {
        setFixtures('');

        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    //---------------------------------------------------------------------------------------------
    it('should be able to add game.', function() {
        spyOn(addGame, 'showSuccess');

        $httpBackend.expectJSONP(DataUtil.getAddGameEndPoint(title));
        createController();
        addGame.addGame(title);
        $httpBackend.flush();

        expect(addGame.showSuccess).toHaveBeenCalled();
    });

    //---------------------------------------------------------------------------------------------
    it('should be able to submit a good title.', function() {
        expect(addGame.isTitleGood(title)).toBe(true);
        expect(addGame.isTitleGood('Final Fantasy')).toBe(true);
        expect(addGame.isTitleGood('')).toBe(false);
    });

});