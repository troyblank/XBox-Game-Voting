//-------------------------------------------------------------------------------------------------
// notification area
//
// this controls the prompt that tells users the deal (if they can vote and what was voted on)
//-------------------------------------------------------------------------------------------------

var notificationArea = {

    $scope: null,

    WEEKEND_MESSAGE: 'Sorry today is a weekend; there is no voting on weekends.',
    READY_TO_VOTE_MESSAGE: 'Today is a new day; you can vote for or suggest a game one time',
    USED_VOTE_MESSAGE: 'You have used your vote or suggest today',

    intialize: function($scope) {
        notificationArea.$scope = $scope;
        notificationArea.addListeners();
        notificationArea.updateStatus();
    },

    addListeners: function() {
        user.eventDispatcher.addEventListener(user.ON_USER_STATE_CHANGE, notificationArea.updateStatus);
    },

    updateStatus: function() {
        if (timeTracker.isWeekDay) {
            if (!user.canVoteOrSuggest) {
                notificationArea.$scope.leftMessage = notificationArea.USED_VOTE_MESSAGE;
            } else {
                notificationArea.$scope.leftMessage = notificationArea.READY_TO_VOTE_MESSAGE;
            }
        } else {
            notificationArea.$scope.leftMessage = notificationArea.WEEKEND_MESSAGE;
        }

    }
}

GameVoter.controller('notification-area', ['$scope', notificationArea.intialize]);