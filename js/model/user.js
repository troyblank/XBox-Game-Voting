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

    eventDispatcher: new EventDispatcher(),
    ON_USER_STATE_CHANGE: 'onUserStateChange',

    initialize: function() {
        user.canVoteOrSuggest = user.determineCanVoteOrSuggest();
    },

    setVoteOrSuggest: function(val) {
        user.canVoteOrSuggest = val;

        user.eventDispatcher.dispatchEvent(user.ON_USER_STATE_CHANGE);
    },

    determineCanVoteOrSuggest: function() {
        if (timeTracker.isWeekDay) {
            return true;
        } else {
            //broadcast it's a weekend
            return false;
        }
    }
}

user.initialize();