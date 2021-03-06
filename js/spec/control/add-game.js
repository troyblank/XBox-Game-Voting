//#################################################################################################
// Add Game
//################################################################################################

describe('Add Game', function() {

    var data = true;
    var title = 'Mega Man';

    beforeEach(function() {
        setFixtures('<section class="add-game"><form><input type="text"><button type="submit">Submit</button></form></section>');
    })

    beforeEach(module("game-voter"));

    beforeEach(inject(function($injector) {
        var $rootScope = $injector.get('$rootScope');
        var $controller = $injector.get('$controller');

        //Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');

        $httpBackend.when('JSONP', DataUtil.getAddGameEndPoint(title)).respond(data);

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
        expect(addGame.isTitleGood(title).status).toBe(true);
        expect(addGame.isTitleGood('Final Fantasy').status).toBe(true);
        expect(addGame.isTitleGood('').status).toBe(false);
    });

    //---------------------------------------------------------------------------------------------
    it('should be able to see if a title is used.', function() {
        gameList.currentTitles = ['mega man', 'final fantasy']
        expect(addGame.isTitleUsed('Mega Man')).toBe(true);
        expect(addGame.isTitleUsed('Final Fantasy')).toBe(true);
        expect(addGame.isTitleUsed('Bubble Bobble')).toBe(false);
    });

    //---------------------------------------------------------------------------------------------
    it('should be able to disable form based on user vote ability.', function() {
        user.canVoteOrSuggest = false;
        addGame.updateStage();
        expect($('.add-game input')).toHaveAttr('disabled');
        expect($('.add-game button')).toHaveAttr('disabled');

        user.canVoteOrSuggest = true;
        addGame.updateStage();
        expect($('.add-game input')).not.toHaveAttr('disabled');
        expect($('.add-game button')).not.toHaveAttr('disabled');
    });

});