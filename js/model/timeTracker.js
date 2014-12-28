//-------------------------------------------------------------------------------------------------
// time tracker
//
// this keeps track of the day
// this app uses the user clock which can be manipulated; should re-factor to backend logic.
//-------------------------------------------------------------------------------------------------

var timeTracker = {

    today: null,
    isWeekDay: null,

    initialize: function() {
        timeTracker.today = timeTracker.getDayWithoutTime(new Date());
        timeTracker.isWeekDay = timeTracker.determineIsWeekDay(timeTracker.today);
    },

    getDayWithoutTime: function(today) {
        //remove the worry of hours, mins, secs, milliseconds.
        return new Date(today.getFullYear(), today.getMonth(), today.getDate());
    },

    determineIsWeekDay: function(today) {
        if (today.getDay() == 6 || today.getDay() == 0) {
            return true;
        }
        return true;
    }
}

timeTracker.initialize();