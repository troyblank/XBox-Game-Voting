angular.module('game-voter').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/addGame.html',
    "<div class=\"game\">\r" +
    "\n" +
    "    <form data-ng-submit=\"submitForm()\">\r" +
    "\n" +
    "        <div class=\"success\" data-ng-show=\"success\" >{{ successMessage }}</div>\r" +
    "\n" +
    "        <div class=\"error\" data-ng-show=\"error\">{{ errorMessage }}</div>\r" +
    "\n" +
    "        <p>Suggest a game.</p>\r" +
    "\n" +
    "        <input type=\"text\" name=\"title\" placeholder=\"Title\" data-ng-model=\"addGameData.title\" />\r" +
    "\n" +
    "        <button type=\"submit\">Submit</button>\r" +
    "\n" +
    "    </form>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('templates/gotGames.html',
    "<h2>Got Games</h2>\r" +
    "\n" +
    "<div data-ng-repeat=\"game in gotGames | orderBy:'title'\" class=\"game\" >\r" +
    "\n" +
    "    <h3>{{ game.title }}</h3>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('templates/notificationArea.html',
    "<div class=\"notification\" data-ng-show=\"leftMessage\" >\r" +
    "\n" +
    "    <span class=\"left\">{{ leftMessage }}</span>\r" +
    "\n" +
    "    <span class=\"right\">Megan Man was last acquired.</span>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('templates/wantGames.html',
    "<h2>Wanted Games</h2>\r" +
    "\n" +
    "<div class=\"game\" data-ng-repeat=\"game in wantGames | orderBy:'votes':true\"  data-ng-click=\"onClick($event, game)\">\r" +
    "\n" +
    "    <h3>{{ game.title }}</h3>\r" +
    "\n" +
    "    <span>(Votes: {{ game.votes }})</span>\r" +
    "\n" +
    "    <button>Vote</button>\r" +
    "\n" +
    "</div>"
  );

}]);
