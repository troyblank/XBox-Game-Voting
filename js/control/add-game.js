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
    $rootScope: null,
    $http: null,

    SUCCESS_MESSAGE: 'Your suggestion was added to the voting list.',
    INVALID_INPUT_MESSAGE: 'Oh snap, that title is not really a title.',
    TITLE_USED_ERROR_MESSAGE: 'Hey! that Game has already been accounted for.',
    SERVICE_ERROR_MESSAGE: 'Sorry Charlie, unfortunately something went horribly wrong, try again later gater.',

    intialize: function($scope, $rootScope, $http) {
        addGame.$scope = $scope;
        addGame.$rootScope = $rootScope;
        addGame.$http = $http;

        addGame.$scope.submitForm = addGame.submitForm;
        addGame.enableForm();
    },

    //---------------------------------------------------------------------------------------------
    // DISPLAY
    //---------------------------------------------------------------------------------------------
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
        if (titleCheck.status) {
            addGame.addGame(title);
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
        addGame.$rootScope.$broadcast('gameAdded');
    },

    //---------------------------------------------------------------------------------------------
    // DATA
    //---------------------------------------------------------------------------------------------
    addGame: function(title) {
        addGame.$http.jsonp(DataUtil.getAddGameEndPoint(title)).success(function(data, status) {
            addGame.disableForm();
            addGame.showSuccess();
        }).error(function(data, status) {
            addGame.showError(addGame.SERVICE_ERROR_MESSAGE);
        });
    }
}

GameVoter.controller('add-game', ['$scope', '$rootScope', '$http', addGame.intialize]);