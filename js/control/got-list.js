//-------------------------------------------------------------------------------------------------
// gotList
//
// this controls the displaying of the got games.
//
// note: dataRecieved, event and prop is set on game-list scope.
//
// USES:
// app
// util/DataUtil
// control/game-list
//-------------------------------------------------------------------------------------------------

var gotList = {

    $scope: null,

    intialize: function($scope, $http) {
        gotList.$scope = $scope;
        gotList.$http = $http;

        gotList.addListeners();

        gotList.refreshDisplay();
    },

    addListeners: function() {
        gotList.$scope.$on('dataRecieved', gotList.refreshDisplay);
    },

    //---------------------------------------------------------------------------------------------
    // DISPLAY
    //---------------------------------------------------------------------------------------------
    refreshDisplay: function() {
        //dataRecieved
        if (gotList.$scope.dataRecieved) {
            gotList.$scope.gotGames = gameList.gotGames;
        }
    }
}

GameVoter.controller('got-list', ['$scope', '$http', gotList.intialize]);