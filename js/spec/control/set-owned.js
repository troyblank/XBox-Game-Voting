//#################################################################################################
// Set Owned
//################################################################################################

describe('Set Owned', function() {

    var $rootScope;

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

    var setGameID = 128955;

    beforeEach(function() {
        localStorage.clear();
        setFixtures('<div></div>');
    });

    beforeEach(module("game-voter"));

    beforeEach(inject(function($injector) {
        $rootScope = $injector.get('$rootScope');
        var $compile = $injector.get('$compile');
        var $controller = $injector.get('$controller');

        //Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');

        $httpBackend.when('JSONP', DataUtil.getGamesEndPoint()).respond(data);
        $httpBackend.when('JSONP', DataUtil.getSetGotItEndPoint(setGameID)).respond(true);

        createGameListController = function() {
            return $controller(gameList.intialize, {
                '$scope': $rootScope
            });
        };

        createSetOwnedController = function() {
            return $controller(setOwned.intialize, {
                '$scope': $rootScope
            });
        };
    }));

    afterEach(function() {
        setFixtures('');
    });

    //---------------------------------------------------------------------------------------------
    it('should refresh display on incoming data.', function() {
        spyOn(setOwned, 'refreshDisplay');

        var setOwnedcontroller = createSetOwnedController();
        $rootScope.$broadcast('dataRecieved');

        expect(setOwned.refreshDisplay).toHaveBeenCalled();
    });

    //---------------------------------------------------------------------------------------------
    it('should be able to vote for a game.', function() {
        spyOn(setOwned, 'setOwnedForDisplay');
        var game = {
            id: setGameID
        }

        $httpBackend.expectJSONP(DataUtil.getGamesEndPoint());
        $httpBackend.expectJSONP(DataUtil.getSetGotItEndPoint(setGameID));
        var gameListcontroller = createGameListController();
        var setOwnedcontroller = createSetOwnedController();
        setOwned.setToOwned(game, null);
        $httpBackend.flush();

        expect(setOwned.setOwnedForDisplay).toHaveBeenCalled();
    });

    //---------------------------------------------------------------------------------------------
    it('should be able to set owned class.', function() {
        setOwned.setOwnedForDisplay($('div'));
        expect($('div')).toHaveClass('owned');
    });

    //---------------------------------------------------------------------------------------------
    it('should refresh stale data.', function() {
        spyOn(gameList, 'refreshData');

        createSetOwnedController();
        $rootScope.dataStale = true;
        setOwned.checkToRefreshData();

        expect(gameList.refreshData).toHaveBeenCalled();
    });

});