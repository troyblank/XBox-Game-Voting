//#################################################################################################
// Want List
//################################################################################################

describe('Want List', function() {

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
    });

    beforeEach(module("game-voter"));

    beforeEach(inject(function($injector) {
        var $rootScope = $injector.get('$rootScope');
        var $compile = $injector.get('$compile');
        var $controller = $injector.get('$controller');

        //Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');

        $httpBackend.when('JSONP', DataUtil.getGamesEndPoint()).respond(data);
        $httpBackend.when('JSONP', DataUtil.getVoteForGameEndPoint(voteGameID)).respond(true);

        createGameListController = function() {
            return $controller(gameList.intialize, {
                '$scope': $rootScope
            });
        };

        createWantListController = function() {
            return $controller(wantList.intialize, {
                '$scope': $rootScope
            });
        };
    }));

    afterEach(function() {
        setFixtures('');
    });

    //---------------------------------------------------------------------------------------------
    it('should be able to tag active state.', function() {
        user.canVoteOrSuggest = true;
        wantList.toggleVoteDisplay();
        expect($('.want-games')).toHaveClass('active');

        user.canVoteOrSuggest = false;
        wantList.toggleVoteDisplay();
        expect($('.want-games')).not.toHaveClass('active');

    });

    //---------------------------------------------------------------------------------------------
    it('should be able to vote for a game.', function() {
        spyOn(wantList, 'setVotedForDisplay');
        var game = {
            id: voteGameID
        }

        $httpBackend.expectJSONP(DataUtil.getGamesEndPoint());
        $httpBackend.expectJSONP(DataUtil.getVoteForGameEndPoint(voteGameID));
        var gameListcontroller = createGameListController();
        var wantListcontroller = createWantListController();
        wantList.voteForGame(game, null);
        $httpBackend.flush();

        // expect(wantList.setVotedForDisplay).toHaveBeenCalled();
    });

});