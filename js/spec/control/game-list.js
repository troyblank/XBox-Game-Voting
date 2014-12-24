//#################################################################################################
// Game List
//################################################################################################

describe('Game List', function() {

    var data = [{
        "id": 128955,
        "status": "wantit",
        "title": "Mega Man",
        "votes": 1
    }, {
        "id": 128956,
        "status": "gotit",
        "title": "Final Fantasy",
        "votes": 5
    }];

    beforeEach(module("game-voter"));

    beforeEach(inject(function($injector) {
        var $rootScope = $injector.get('$rootScope');
        var $compile = $injector.get('$compile');
        var $controller = $injector.get('$controller');

        //Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');

        var authRequestHandler = $httpBackend.when('JSONP', DataUtil.getGamesEndPoint()).respond(data);

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
        spyOn(gameList, 'parseGameData');

        $httpBackend.expectJSONP(DataUtil.getGamesEndPoint());
        controller = createController();
        $httpBackend.flush();

        expect(gameList.parseGameData).toHaveBeenCalled();
    });

    //---------------------------------------------------------------------------------------------
    it('should be able to spit a games into want and got lists.', function() {
        var splitLists = gameList.splitWantAndGotGames(data);

        expect(splitLists.wantList.length).toBeGreaterThan(0);
        expect(splitLists.gotList.length).toBeGreaterThan(0);
    });

    //---------------------------------------------------------------------------------------------
    it('should be able to store current titles.', function() {
        var currentTitles = gameList.getCurrentTitles(data);

        expect(currentTitles.length).toBe(2);
    });

});