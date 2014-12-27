var GameVoter = angular.module('game-voter', ['ngRoute']).config(function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        templateUrl: 'templates/wantGames.html',
        controller: 'want-list'
    }).when('/suggest', {
        templateUrl: 'templates/addGame.html',
        controller: 'add-game'
    }).when('/owned', {
        templateUrl: 'templates/gotGames.html',
        controller: 'got-list'
    }).otherwise({
        redirectTo: '/'
    });

    $locationProvider.html5Mode(false);
});