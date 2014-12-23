var express = require('express');
var colors = require('colors');

var server = {

    app: express(),
    server: null,

    PORT: 8000,

    initialize: function() {
        server.urlConfs();
        server.startWebServer();
    },

    startWebServer: function() {
        server = server.app.listen(server.PORT);
        console.log(('Express server now running on :' + this.PORT).green);
    },

    stopWebServer: function() {
        server.app.close();
        process.exit();
    },

    //---------------------------------------------------------------------------------------------
    // URL CONFS
    //---------------------------------------------------------------------------------------------
    urlConfs: function() {
        server.app.use(express.static(__dirname + '/'));
    }
}

server.initialize();