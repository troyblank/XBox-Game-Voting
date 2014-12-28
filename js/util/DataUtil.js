var DataUtil = {
    //This is a helper literal to be used with all end point calls.

    API_KEY: '3c9cc9d5b284b9067f0ce365c34cbf9d',

    DATA_BASE_URL: 'http://js.november.sierrabravo.net/challenge/',
    GET_GAMES_POINT: 'getGames',
    ADD_GAME_POINT: 'addGame',
    ADD_VOTE_POINT: 'addVote',
    SET_GOT_IT: 'setGotIt',

    getQueryParams: function(extraParams) {
        var query = '?apiKey=' + encodeURIComponent(DataUtil.API_KEY) + '&callback=JSON_CALLBACK';
        if (extraParams) {
            for (var prop in extraParams) {
                query += '&' + prop + '=' + extraParams[prop];
            }
        }
        return query;
    },

    getGamesEndPoint: function() {
        return DataUtil.DATA_BASE_URL + DataUtil.GET_GAMES_POINT + DataUtil.getQueryParams();
    },

    getAddGameEndPoint: function(title) {
        return DataUtil.DATA_BASE_URL + DataUtil.ADD_GAME_POINT + DataUtil.getQueryParams({
            'title': title
        });
    },

    getVoteForGameEndPoint: function(id) {
        return DataUtil.DATA_BASE_URL + DataUtil.ADD_VOTE_POINT + DataUtil.getQueryParams({
            'id': id
        });
    },

    getSetGotItEndPoint: function(id) {
        return DataUtil.DATA_BASE_URL + DataUtil.SET_GOT_IT + DataUtil.getQueryParams({
            'id': id
        });
    }
}