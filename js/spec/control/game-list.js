//#################################################################################################
// Game List
//################################################################################################

describe('Game List', function() {

    beforeEach(module("game-voter"));

    beforeEach(inject(function($injector) {
        var $rootScope = $injector.get('$rootScope');
        var $compile = $injector.get('$compile');
        var $controller = $injector.get('$controller');

        //Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');

        var authRequestHandler = $httpBackend.when('JSONP', DataUtil.getGamesEndPoint()).respond([{
            "id": 128955,
            "status": "wantit",
            "title": "Mega man",
            "votes": 1
        }]);

        createController = function() {
            return $controller(gameList.intialize, {
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
    it('should be able to get game list data.', function() {
        $httpBackend.expectJSONP(DataUtil.getGamesEndPoint());
        var controller = createController();
        $httpBackend.flush();
    });

});