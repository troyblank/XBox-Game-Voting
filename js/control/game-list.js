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
        gameList.toggleVoteDisplay();
        gameList.addListeners();
    },

    addListeners: function() {
        gameList.$scope.$on('gameAdded', gameList.refreshDisplay);
        user.eventDispatcher.addEventListener(user.ON_USER_STATE_CHANGE, gameList.toggleVoteDisplay);
    },

    //---------------------------------------------------------------------------------------------
    // DISPLAY
    //---------------------------------------------------------------------------------------------
    showListError: function() {
        gameList.$scope.error = true;
        gameList.$scope.errorMessage = gameList.LIST_ERROR_MESSAGE
    },

    toggleVoteDisplay: function() {
        if (user.canVoteOrSuggest) {
            $('.want-games').addClass('active');
        } else {
            $('.want-games').removeClass('active');
        }
    },

    refreshDisplay: function() {
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
            gameList.$scope.wantGames = gameLists.wantList;
        }
        if (gameLists.gotList.length > 0) {
            gameList.$scope.gotGames = gameLists.gotList;
        }

        gameList.$scope.gamesDisplayed = true;
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