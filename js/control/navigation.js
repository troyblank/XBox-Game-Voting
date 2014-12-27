//-------------------------------------------------------------------------------------------------
// navigation
//
// this controls the active states of the navigation
//
// USES:
// app
//-------------------------------------------------------------------------------------------------

var navigation = {
    $scope: null,
    $location: null,

    intialize: function($scope, $location) {
        navigation.$scope = $scope;
        navigation.$location = $location;

        navigation.$scope.isActive = navigation.isActive;
    },

    isActive: function(route) {
        return route === navigation.$location.path();
    }
}

GameVoter.controller('navigation', ['$scope', '$location', navigation.intialize]);