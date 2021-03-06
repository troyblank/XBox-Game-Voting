//#################################################################################################
// time tracker
//#################################################################################################

describe('Time Tracker', function() {

    //---------------------------------------------------------------------------------------------
    it('should determine if a day is a week day.', function() {
        var tue = new Date();
        tue.setFullYear(2009);
        tue.setMonth(7);
        tue.setDate(25);

        var sat = new Date();
        sat.setFullYear(2012);
        sat.setMonth(7);
        sat.setDate(25);

        expect(timeTracker.determineIsWeekDay(tue)).toBe(true);
        expect(timeTracker.determineIsWeekDay(sat)).toBe(false);
    });

    // //---------------------------------------------------------------------------------------------
    it('should get the day without detail time information.', function() {
        var today = new Date();

        expect(timeTracker.getDayWithoutTime(today).getMilliseconds()).toBe(0);
    });
});