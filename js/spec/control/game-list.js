//#################################################################################################
// Game List
//################################################################################################

describe('Game List', function() {

    var $rootScope = null;

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

    var voteGameID = 128955;

    beforeEach(function() {
        localStorage.clear();
        setFixtures('<section class="want-games"></section>');
    })

    beforeEach(module("game-voter"));

    beforeEach(inject(function($injector) {
        $rootScope = $injector.get('$rootScope');
        var $compile = $injector.get('$compile');
        var $controller = $injector.get('$controller');

        //Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');

        $httpBackend.when('JSONP', DataUtil.getGamesEndPoint()).respond(data);
        $httpBackend.when('JSONP', DataUtil.getVoteForGameEndPoint(voteGameID)).respond(true);

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

    //---------------------------------------------------------------------------------------------
    it('should refresh display when games are added.', function() {
        spyOn(gameList, 'refreshDisplay');

        $httpBackend.expectJSONP(DataUtil.getGamesEndPoint());
        controller = createController();
        $httpBackend.flush();

        $rootScope.$broadcast('gameAdded');

        expect(gameList.refreshDisplay).toHaveBeenCalled();
    });

    //---------------------------------------------------------------------------------------------
    it('should be able to tag active state.', function() {
        user.canVoteOrSuggest = true;
        gameList.toggleVoteDisplay();
        expect($('.want-games')).toHaveClass('active');

        user.canVoteOrSuggest = false;
        gameList.toggleVoteDisplay();
        expect($('.want-games')).not.toHaveClass('active');

    });

    //---------------------------------------------------------------------------------------------
    it('should be able to vote for a game.', function() {
        spyOn(gameList, 'setVotedForDisplay');
        var game = {
            id: voteGameID
        }

        $httpBackend.expectJSONP(DataUtil.getGamesEndPoint());
        $httpBackend.expectJSONP(DataUtil.getVoteForGameEndPoint(voteGameID));
        controller = createController();
        gameList.voteForGame(game, null);
        $httpBackend.flush();

        expect(gameList.setVotedForDisplay).toHaveBeenCalled();
    });

});