//-------------------------------------------------------------------------------------------------
// wantList
//
// this controls the displaying of the wanted games.
//
// note: dataRecieved, event and prop is set on game-list scope.
//
// USES:
// app
// util/DataUtil
// control/game-list
//-------------------------------------------------------------------------------------------------

var wantList = {

    $scope: null,

    intialize: function($scope, $http) {
        wantList.$scope = $scope;
        wantList.$http = $http;

        wantList.toggleVoteDisplay();
        wantList.addListeners();

        wantList.refreshDisplay();
    },

    addListeners: function() {
        wantList.$scope.$on('dataRecieved', wantList.refreshDisplay);
        wantList.$scope.onClick = wantList.onClickEvent;
        user.eventDispatcher.addEventListener(user.ON_USER_STATE_CHANGE, wantList.toggleVoteDisplay);
    },

    //---------------------------------------------------------------------------------------------
    // VOTING
    //---------------------------------------------------------------------------------------------
    onClickEvent: function(e, game) {
        if (user.canVoteOrSuggest) {
            wantList.voteForGame(game, e.target);
        }
    },

    voteForGame: function(game, target) {
        wantList.$http.jsonp(DataUtil.getVoteForGameEndPoint(game.id)).success(function(data, status) {
            wantList.setVotedForDisplay(game, target);
            user.setVoteOrSuggest(false);
        }).error(function(data, status) {
            wantList.showListError();
        });
    },

    setVotedForDisplay: function(game, target) {
        $(target).addClass('votedFor');
        game.votes++;
    },

    //---------------------------------------------------------------------------------------------
    // DISPLAY
    //---------------------------------------------------------------------------------------------
    refreshDisplay: function() {
        //dataRecieved
        if (wantList.$scope.dataRecieved) {
            wantList.$scope.wantGames = gameList.wantGames;
            if (gameList.wantGames === null) {
                wantList.$scope.zeroResults = true;
            }
        }
    },

    toggleVoteDisplay: function() {
        if (user.canVoteOrSuggest) {
            $('.want-games').addClass('active');
        } else {
            $('.want-games').removeClass('active');
        }
    }
}

GameVoter.controller('want-list', ['$scope', '$http', wantList.intialize]);