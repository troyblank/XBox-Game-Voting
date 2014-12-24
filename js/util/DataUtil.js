var DataUtil = {
    //This is a helper literal to be used with all end point calls.

    API_KEY: '3c9cc9d5b284b9067f0ce365c34cbf9',

    DATA_BASE_URL: 'http://js.november.sierrabravo.net/challenge/',
    GET_GAMES_POINT: 'getGames',

    getQueryParams: function() {
        return '?apiKey=' + encodeURIComponent(DataUtil.API_KEY) + '&callback=JSON_CALLBACK';
    },

    getGamesEndPoint: function() {
        return DataUtil.DATA_BASE_URL + DataUtil.GET_GAMES_POINT + DataUtil.getQueryParams();
    }
}