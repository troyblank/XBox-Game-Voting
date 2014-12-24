//-------------------------------------------------------------------------------------------------
// gameList
//
// this controls the displaying of game lists
//
// USES:
// util/AngularApps
// util/DataUtil
//-------------------------------------------------------------------------------------------------

var gameList = {

    $scope: null,
    $http: null,

    currentTitles: [],

    WANT_STATUS: 'wantit',

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
            gameList.$scope.wantGames = gameLists.wantList;
        }
        if (gameLists.gotList.length > 0) {
            gameList.$scope.gotGames = gameLists.gotList;
        }
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

GameVoter.controller('game-list', ['$scope', '$http', gameList.intialize]);