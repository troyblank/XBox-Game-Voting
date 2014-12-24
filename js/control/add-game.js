//-------------------------------------------------------------------------------------------------
// addGame
//
// this controls the users ability to add a game via a form
//
// USES:
// util/AngularApps
// util/BaseUtil
// util/DataUtil
// control/gameList
//-------------------------------------------------------------------------------------------------

var addGame = {
    $scope: null,
    $http: null,

    intialize: function($scope, $http) {
        addGame.$scope = $scope;
        addGame.$http = $http;

        addGame.$scope.submitForm = addGame.submitForm;
    },

    //---------------------------------------------------------------------------------------------
    // FORM
    //---------------------------------------------------------------------------------------------
    submitForm: function() {
        var title = addGame.$scope.addGameData ? addGame.$scope.addGameData.title : null;
        if (addGame.isTitleGood(title)) {
            addGame.addGame(title);
        }
    },

    isTitleGood: function(title) {
        if (BaseUtil.contentTest(title)) {
            if (addGame.isTitleUsed(title)) {
                return false;
            }
            return true;
        }
        return false;
    },

    isTitleUsed: function(title) {
        return gameList.currentTitles.indexOf(title) >= 0;
    },

    showSuccess: function() {

    },

    //---------------------------------------------------------------------------------------------
    // DATA
    //---------------------------------------------------------------------------------------------
    addGame: function(title) {
        addGame.$http.jsonp(DataUtil.getAddGameEndPoint(title)).success(function(data, status) {
            addGame.showSuccess();
        }).error(function(data, status) {

        });
    }
}

GameVoter.controller('add-game', ['$scope', '$http', addGame.intialize]);