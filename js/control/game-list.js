var gameList = {

    scope: null,
    http: null,

    intialize: function($scope, $http) {
        gameList.$scope = $scope;
        gameList.$http = $http;
        gameList.getGameData();
    },

    //---------------------------------------------------------------------------------------------
    // DISPLAY
    //---------------------------------------------------------------------------------------------

    showListError: function() {
        $('[data-ng-controller="game-list"]').html('<div class="error icon-skull">Sorry Charlie, unfortunately something went horribly wrong, try again later gater.</div>');
    },

    //---------------------------------------------------------------------------------------------
    // DATA
    //---------------------------------------------------------------------------------------------
    getGameData: function() {
        gameList.$http.jsonp(DataUtil.getGamesEndPoint()).success(function(data, status) {
            //inject data here
        }).error(function(data, status) {
            gameList.showListError();
        });
    }
}

var GameVoter = angular.module('game-voter', []);
GameVoter.controller('game-list', ['$scope', '$http', gameList.intialize]);