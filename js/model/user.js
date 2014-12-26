//-------------------------------------------------------------------------------------------------
// user
//
// this keeps track of the user and if they can vote or suggest a game
// allows stores this information for next time, ending a voting cycle is done
// with the user as there is no backend to run this task.
//
// USES:
// model/timeTracker
//------------------------------------------------------------------------------------------------

var user = {

    canVoteOrSuggest: null,

    STATE_STORE_KEY: 'userStore',

    eventDispatcher: new EventDispatcher(),
    ON_USER_STATE_CHANGE: 'onUserStateChange',

    initialize: function() {
        user.canVoteOrSuggest = user.determineCanVoteOrSuggest();
    },

    setVoteOrSuggest: function(val) {
        user.canVoteOrSuggest = val;
        localStorage.setItem(user.STATE_STORE_KEY, JSON.stringify({
            canVoteOrSuggest: user.canVoteOrSuggest,
            dayStamp: timeTracker.today.getTime()
        }));

        user.eventDispatcher.dispatchEvent(user.ON_USER_STATE_CHANGE);
    },

    determineCanVoteOrSuggest: function() {
        var userStore = JSON.parse(localStorage.getItem(user.STATE_STORE_KEY));

        if (timeTracker.isWeekDay) {
            if (userStore && userStore.dayStamp == timeTracker.today.getTime()) {
                //last vote was today
                return userStore.canVoteOrSuggest;
            } else {
                return true;
            }
        } else {
            //broadcast it's a weekend
            return false;
        }
    }
}

user.initialize();