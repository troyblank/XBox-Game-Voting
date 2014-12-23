//-------------------------------------------------------------------------------------------------
var base = [
    'js/lib/jquery-1.11.1.js',
    'js/util/BaseUtil.js'
]

var fileList = {
    'web/static/scripts/base.min.js': base
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