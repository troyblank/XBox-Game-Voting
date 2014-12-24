var gameList = {

    scope: null,
    http: null,

    LIST_ERROR_MESSAGE: 'Sorry Charlie, unfortunately something went horribly wrong, try again later gater.',

    intialize: function($scope, $http) {
        gameList.$scope = $scope;
        gameList.$http = $http;
        gameList.getGameData();
    },

    //---------------------------------------------------------------------------------------------
    // DISPLAY
    //---------------------------------------------------------------------------------------------

    showListError: function() {
        $('[data-ng-controller="game-list"]').html(nunjucks.render('error.html', {
            'message': gameList.LIST_ERROR_MESSAGE
        }));
    },

    //---------------------------------------------------------------------------------------------
    // DATA
    //---------------------------------------------------------------------------------------------
    getGameData: function() {
        gameList.$http.jsonp(DataUtil.getGamesEndPoint()).success(function(data, status) {
            if (data) {
                //do something
            } else {
                gameList.showListError();
            }
        }).error(function(data, status) {
            gameList.showListError();
        });
    }
}

var GameVoter = angular.module('game-voter', []);
GameVoter.controller('game-list', ['$scope', '$http', gameList.intialize]);