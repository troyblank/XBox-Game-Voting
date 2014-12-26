//-------------------------------------------------------------------------------------------------
// time tracker
//
// this keeps track of the day
// this app uses the user clock which can be manipulated; should re-factor to backend logic.
//-------------------------------------------------------------------------------------------------

var TimeTracker = {

    today: null,
    isWeekDay: null,

    initialize: function() {
        TimeTracker.today = TimeTracker.getDayWithoutTime(new Date());
        TimeTracker.isWeekDay = TimeTracker.isWeekDay(TimeTracker.today);
    },

    getDayWithoutTime: function(today) {
        //remove the worry of hours, mins, secs, milliseconds.
        return new Date(today.getFullYear(), today.getMonth(), today.getDate());
    },

    isWeekDay: function(today) {
        if (today.getDay() == 6 || today.getDay() == 0) {
            return false;
        }
        return true;
    }
}

$(document).ready(TimeTracker.initialize);