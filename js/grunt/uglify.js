//-------------------------------------------------------------------------------------------------
var base = [
    'js/lib/angular.js',
    'js/lib/jquery-1.11.1.js',
    'js/util/BaseUtil.js',
    'js/util/DataUtil.js'
]

var voteApp = [
    'js/util/AngularApps.js',
    'js/view/templates.js',
    'js/control/baseUI.js',
    'js/control/notification-area.js',
    'js/control/game-list.js',
    'js/control/add-game.js'
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