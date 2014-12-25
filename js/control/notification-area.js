//-------------------------------------------------------------------------------------------------
// notification area
//
// this controls the prompt that tells users the deal (if they can vote and what was voted on)
//-------------------------------------------------------------------------------------------------

var notificationArea = {

    $scope: null,

    intialize: function($scope) {
        notificationArea.$scope = $scope;
    }
}


GameVoter.controller('notification-area', ['$scope', notificationArea.intialize]);