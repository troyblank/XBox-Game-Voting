var GameVoter = angular.module('game-voter', ['ngRoute'])

GameVoter.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        templateUrl: 'templates/wantGames.html',
        controller: 'want-list'
    }).when('/suggest', {
        templateUrl: 'templates/addGame.html',
        controller: 'add-game'
    }).when('/owned', {
        templateUrl: 'templates/gotGames.html',
        controller: 'got-list'
    }).when('/set', {
        templateUrl: 'templates/setOwned.html',
        controller: 'set-owned'
    }).otherwise({
        redirectTo: '/'
    });

    $locationProvider.html5Mode(false);
}]);