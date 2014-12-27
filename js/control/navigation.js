//-------------------------------------------------------------------------------------------------
// navigation
//
// this controls the displaying of content via the nav, and the nav itself
//-------------------------------------------------------------------------------------------------

var navigation = {
    $scope: null,

    intialize: function($scope) {
        gameList.$scope = $scope;
    }
}

GameVoter.controller('navigation', ['$scope', navigation.intialize]);