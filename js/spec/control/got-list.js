//#################################################################################################
// Got List
//################################################################################################

describe('Got List', function() {

    var $rootScope;

    beforeEach(function() {
        localStorage.clear();
    });

    beforeEach(module("game-voter"));

    beforeEach(inject(function($injector) {
        $rootScope = $injector.get('$rootScope');
        var $controller = $injector.get('$controller');

        createGotListController = function() {
            return $controller(gotList.intialize, {
                '$scope': $rootScope
            });
        };
    }));

    afterEach(function() {
        setFixtures('');
    });

    //---------------------------------------------------------------------------------------------
    it('should refresh stale data.', function() {
        spyOn(gameList, 'refreshData');

        createGotListController();
        $rootScope.dataStale = true;
        gotList.checkToRefreshData();

        expect(gameList.refreshData).toHaveBeenCalled();
    });
});