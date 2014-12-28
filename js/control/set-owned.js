//-------------------------------------------------------------------------------------------------
// setOwned
//
// this controls the ability to set games that being voted on to owned status
//
// note: dataRecieved, event and prop is set on game-list scope.
//
// USES:
// app
// util/DataUtil
// control/game-list
//-------------------------------------------------------------------------------------------------

var setOwned = {

    $scope: null,
    $http: null,

    intialize: function($scope, $http) {
        setOwned.$scope = $scope;
        setOwned.$http = $http;

        setOwned.addListeners();

        setOwned.refreshDisplay();
    },

    addListeners: function() {
        setOwned.$scope.$on('dataRecieved', setOwned.refreshDisplay);
        setOwned.$scope.onClick = setOwned.onClickEvent;
    },

    //---------------------------------------------------------------------------------------------
    // VOTING
    //---------------------------------------------------------------------------------------------
    onClickEvent: function(e, game) {
        setOwned.setToOwned(game, e.target);
    },

    setToOwned: function(game, target) {
        setOwned.$http.jsonp(DataUtil.getSetGotItEndPoint(game.id)).success(function(data, status) {
            setOwned.setOwnedForDisplay(target);
            gameList.markDataStale();
        }).error(function(data, status) {
            gameList.showListError();
        });
    },

    setOwnedForDisplay: function(target) {
        $(target).addClass('owned');
    },

    //---------------------------------------------------------------------------------------------
    // DISPLAY
    //---------------------------------------------------------------------------------------------
    refreshDisplay: function() {
        //dataRecieved
        if (setOwned.$scope.dataRecieved) {
            setOwned.$scope.wantGames = gameList.wantGames;
            if (gameList.wantGames === null) {
                setOwned.$scope.zeroResults = true;
            }
        }
    }
}

GameVoter.controller('set-owned', ['$scope', '$http', setOwned.intialize]);