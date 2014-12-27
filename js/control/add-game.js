//-------------------------------------------------------------------------------------------------
// addGame
//
// this controls the users ability to add a game via a form
//
// USES:
// app
// util/BaseUtil
// util/DataUtil
// model/user
// control/gameList
//-------------------------------------------------------------------------------------------------

var addGame = {
    $scope: null,
    $http: null,

    SUCCESS_MESSAGE: 'Your suggestion was added to the voting list.',
    INVALID_INPUT_MESSAGE: 'Oh snap, that title is not really a title.',
    TITLE_USED_ERROR_MESSAGE: 'Hey! that Game has already been accounted for.',
    SERVICE_ERROR_MESSAGE: 'Sorry Charlie, unfortunately something went horribly wrong, try again later gater.',

    intialize: function($scope, $http) {
        addGame.$scope = $scope;
        addGame.$http = $http;

        addGame.$scope.submitForm = addGame.submitForm;

        addGame.addEventListeners();
        addGame.updateStage();
    },

    addEventListeners: function() {
        user.eventDispatcher.addEventListener(user.ON_USER_STATE_CHANGE, addGame.updateStage);
    },

    //---------------------------------------------------------------------------------------------
    // DISPLAY
    //---------------------------------------------------------------------------------------------
    updateStage: function() {
        if (user.canVoteOrSuggest) {
            addGame.enableForm();
        } else {
            addGame.disableForm();
        }
    },

    enableForm: function() {
        $('.add-game input').removeAttr('disabled');
        $('.add-game button').removeAttr('disabled');
    },

    disableForm: function() {
        $('.add-game input').attr('disabled', 'true');
        $('.add-game button').attr('disabled', 'true');
    },

    showSuccess: function() {
        addGame.$scope.error = false;
        addGame.$scope.success = true;
        addGame.$scope.successMessage = addGame.SUCCESS_MESSAGE;
    },

    showError: function(message) {
        addGame.$scope.error = true;
        addGame.$scope.errorMessage = message;
    },

    //---------------------------------------------------------------------------------------------
    // FORM
    //---------------------------------------------------------------------------------------------
    submitForm: function() {
        var title = addGame.$scope.addGameData ? addGame.$scope.addGameData.title : null;
        var titleCheck = addGame.isTitleGood(title);
        if (titleCheck.status && user.canVoteOrSuggest) {
            addGame.addGame(title);
            gameList.refreshData();
        } else {
            addGame.showError(titleCheck.message);
        }
    },

    isTitleGood: function(title) {
        if (BaseUtil.contentTest(title)) {
            if (addGame.isTitleUsed(title)) {
                return {
                    'status': false,
                    'message': addGame.TITLE_USED_ERROR_MESSAGE
                };
            }
            return {
                'status': true
            };
        }
        return {
            'status': false,
            'message': addGame.INVALID_INPUT_MESSAGE
        };
    },

    isTitleUsed: function(title) {
        return gameList.currentTitles.indexOf(title.toLowerCase()) >= 0;
    },

    //---------------------------------------------------------------------------------------------
    // DATA
    //---------------------------------------------------------------------------------------------
    addGame: function(title) {
        addGame.$http.jsonp(DataUtil.getAddGameEndPoint(title)).success(function(data, status) {
            user.setVoteOrSuggest(false);
            addGame.showSuccess();
        }).error(function(data, status) {
            addGame.showError(addGame.SERVICE_ERROR_MESSAGE);
        });
    }
}

GameVoter.controller('add-game', ['$scope', '$http', addGame.intialize]);