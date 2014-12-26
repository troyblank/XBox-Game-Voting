//-------------------------------------------------------------------------------------------------
// notification area
//
// this controls the prompt that tells users the deal (if they can vote and what was voted on)
//-------------------------------------------------------------------------------------------------

var notificationArea = {

    $scope: null,

    WEEKEND_MESSAGE: 'Sorry today is a weekend; there is no voting on weekends.',
    READY_TO_VOTE_MESSAGE: 'Today is a new day; you can vote for or suggest a game one time',

    intialize: function($scope) {
        notificationArea.$scope = $scope;
        notificationArea.updateStatus();
    },

    updateStatus: function() {
        if (timeTracker.isWeekDay) {
            notificationArea.$scope.leftMessage = notificationArea.READY_TO_VOTE_MESSAGE;
        } else {
            notificationArea.$scope.leftMessage = notificationArea.WEEKEND_MESSAGE;
        }

    }
}

GameVoter.controller('notification-area', ['$scope', notificationArea.intialize]);