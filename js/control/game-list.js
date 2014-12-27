//-------------------------------------------------------------------------------------------------
// gameList
//
// this controls the displaying of game lists, because the data for want and data list are received
// in one endpoint this is a parent of the two lists that delegates data responsibility.
//
// USES:
// app
// util/DataUtil
//-------------------------------------------------------------------------------------------------

var gameList = {

    $scope: null,
    $rootScope: null,
    $http: null,

    wantGames: null,
    gotGames: null,
    currentTitles: [],

    WANT_STATUS: 'wantit',

    LIST_ERROR_MESSAGE: 'Sorry Charlie, unfortunately something went horribly wrong, try again later gater.',

    intialize: function($scope, $rootScope, $http) {
        gameList.$scope = $scope;
        gameList.$rootScope = $rootScope;
        gameList.$http = $http;

        gameList.getGameData();
    },

    //---------------------------------------------------------------------------------------------
    // DISPLAY
    //---------------------------------------------------------------------------------------------
    showListError: function() {
        gameList.$scope.error = true;
        gameList.$scope.errorMessage = gameList.LIST_ERROR_MESSAGE
    },

    refreshData: function() {
        gameList.$rootScope.dataRecieved = false;
        gameList.getGameData();
    },

    //---------------------------------------------------------------------------------------------
    // DATA
    //---------------------------------------------------------------------------------------------
    getGameData: function() {
        gameList.$http.jsonp(DataUtil.getGamesEndPoint()).success(function(data, status) {
            if (data) {
                gameList.parseGameData(data);
            } else {
                gameList.showListError();
            }
        }).error(function(data, status) {
            gameList.showListError();
        });
    },

    parseGameData: function(data) {
        gameList.currentTitles = gameList.getCurrentTitles(data);
        var gameLists = gameList.splitWantAndGotGames(data);

        if (gameLists.wantList.length > 0) {
            gameList.wantGames = gameLists.wantList;
        }
        if (gameLists.gotList.length > 0) {
            gameList.gotGames = gameLists.gotList;
        }

        gameList.$rootScope.dataRecieved = true;
        gameList.$rootScope.$broadcast('dataRecieved');
    },

    getCurrentTitles: function(data) {
        currentTitles = [];
        var i = data.length - 1;
        while (i >= 0) {
            currentTitles.push(data[i].title.toLowerCase());
            i--;
        }

        return currentTitles;
    },

    splitWantAndGotGames: function(data) {
        var wantList = [];
        var gotList = [];
        for (var prop in data) {
            if (data[prop].status == gameList.WANT_STATUS) {
                wantList.push(data[prop]);
            } else {
                gotList.push(data[prop]);
            }
        }
        return {
            'wantList': wantList,
            'gotList': gotList
        }
    }
}

GameVoter.controller('game-list', ['$scope', '$rootScope', '$http', gameList.intialize]);