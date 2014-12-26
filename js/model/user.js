//-------------------------------------------------------------------------------------------------
// user
//
// this keeps track of the user and if they can vote or suggest a game
// allows stores this information for next time, ending a voting cycle is done
// with the user as there is no backend to run this task.
//------------------------------------------------------------------------------------------------

var user = {

    canVoteOrSuggest: null,

    initialize: function() {
        user.canVoteOrSuggest = user.canVoteOrSuggest();
    },

    canVoteOrSuggest: function() {
        if (timeTracker.isWeekDay) {
            return true;
        } else {
            //broadcast it's a weekend
            return false;
        }
    }
}

user.initialize;