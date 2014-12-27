//-------------------------------------------------------------------------------------------------
var base = [
    'js/lib/angular.js',
    'js/lib/angular-route.js',
    'js/lib/jquery-1.11.1.js',
    'js/util/BaseUtil.js',
    'js/util/EventDispatcher.js'
]

var voteApp = [
    'js/app.js',
    'js/util/DataUtil.js',
    'js/model/timeTracker.js',
    'js/model/user.js',
    'js/view/templates.js',
    'js/control/baseUI.js',
    'js/control/navigation.js',
    'js/control/notification-area.js',
    'js/control/game-list.js',
    'js/control/want-list.js',
    'js/control/add-game.js',
    'js/control/got-list.js'
]

voteApp = base.concat(voteApp);

var fileList = {
    'web/static/scripts/base.min.js': voteApp
}

module.exports = {
    dev: {
        options: {
            mangle: false,
            sourceMap: true,
            beautify: true,
            sourceMapIncludeSources: true,
            compress: false
        },

        files: fileList
    },
    deploy: {
        options: {
            mangle: true,
            sourceMap: false,
            beautify: false,
            sourceMapIncludeSources: false,
            compress: true
        },

        files: fileList
    }
};