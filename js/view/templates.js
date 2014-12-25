angular.module('game-voter').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/gotGame.html',
    "<h3>{{ game.title }}</h3>"
  );


  $templateCache.put('templates/wantGame.html',
    "<h3>{{ game.title }}</h3>\r" +
    "\n" +
    "<span>(Votes: {{ game.votes }})</span>\r" +
    "\n" +
    "<button>Vote</button>"
  );

}]);
