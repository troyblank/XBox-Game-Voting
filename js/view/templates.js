angular.module('game-voter').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/addGame.html',
    "<section class=\"add-game\">\r" +
    "\n" +
    "    <h2>Suggest a Game</h2>\r" +
    "\n" +
    "    <div class=\"game\">\r" +
    "\n" +
    "        <form data-ng-submit=\"submitForm()\">\r" +
    "\n" +
    "            <div class=\"success\" data-ng-show=\"success\" >{{ successMessage }}</div>\r" +
    "\n" +
    "            <div class=\"error\" data-ng-show=\"error\">{{ errorMessage }}</div>\r" +
    "\n" +
    "            <p>Suggest a game.</p>\r" +
    "\n" +
    "            <input type=\"text\" name=\"title\" placeholder=\"Title\" data-ng-model=\"addGameData.title\" />\r" +
    "\n" +
    "            <button type=\"submit\">Submit</button>\r" +
    "\n" +
    "        </form>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</section>"
  );


  $templateCache.put('templates/gotGames.html',
    "<section class=\"got-games\">\r" +
    "\n" +
    "    <h2>Got Games</h2>\r" +
    "\n" +
    "    <img class=\"preloader\" src=\"static/images/svg/preloader.svg\" alt=\"loading\" data-ng-show=\"!dataRecieved\" />\r" +
    "\n" +
    "    <div class=\"notification\" ng-show=\"zeroResults\">\r" +
    "\n" +
    "        <span>There is currently no games owned.</span>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"game\" data-ng-repeat=\"game in gotGames | orderBy:'title'\"  >\r" +
    "\n" +
    "        <h3>{{ game.title }}</h3>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</section>"
  );


  $templateCache.put('templates/navigation.html',
    "<ul>\r" +
    "\n" +
    "    <li data-ng-class=\"{active:isActive('/')}\"><a href=\"#/\">Vote For Games</a></li>\r" +
    "\n" +
    "    <li data-ng-class=\"{active:isActive('/suggest')}\"><a href=\"#/suggest\">Suggest A Game</a></li>\r" +
    "\n" +
    "    <li data-ng-class=\"{active:isActive('/owned')}\"><a href=\"#/owned\">View Owned Games</a></li>\r" +
    "\n" +
    "    <li data-ng-class=\"{active:isActive('/set')}\"><a href=\"#/set\">Set Owned Games</a></li>\r" +
    "\n" +
    "</ul>"
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


  $templateCache.put('templates/setOwned.html',
    "<section class=\"want-games set-to-own\">\r" +
    "\n" +
    "    <h2>Set Owned</h2>\r" +
    "\n" +
    "    <img class=\"preloader\" src=\"static/images/svg/preloader.svg\" alt=\"loading\" data-ng-show=\"!dataRecieved\" />\r" +
    "\n" +
    "    <div class=\"notification\" ng-show=\"zeroResults\">\r" +
    "\n" +
    "        <span>There is currently no games to set to owned.</span>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"game\" data-ng-repeat=\"game in wantGames | orderBy:'votes':true\"  data-ng-click=\"onClick($event, game)\">\r" +
    "\n" +
    "        <h3>{{ game.title }}</h3>\r" +
    "\n" +
    "        <span>(Votes: {{ game.votes }})</span>\r" +
    "\n" +
    "        <button>Owned</button>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</section>"
  );


  $templateCache.put('templates/wantGames.html',
    "<section class=\"want-games\">\r" +
    "\n" +
    "    <h2>Wanted Games</h2>\r" +
    "\n" +
    "    <img class=\"preloader\" src=\"static/images/svg/preloader.svg\" alt=\"loading\" data-ng-show=\"!dataRecieved\" />\r" +
    "\n" +
    "    <div class=\"notification\" ng-show=\"zeroResults\">\r" +
    "\n" +
    "        <span>There is currently no games to vote on, please suggest a game.</span>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"game\" data-ng-repeat=\"game in wantGames | orderBy:'votes':true\"  data-ng-click=\"onClick($event, game)\">\r" +
    "\n" +
    "        <h3>{{ game.title }}</h3>\r" +
    "\n" +
    "        <span>(Votes: {{ game.votes }})</span>\r" +
    "\n" +
    "        <button>Vote</button>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</section>"
  );

}]);
