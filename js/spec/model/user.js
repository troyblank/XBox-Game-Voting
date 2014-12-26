//#################################################################################################
// user
//#################################################################################################

describe('User', function() {

    //---------------------------------------------------------------------------------------------
    it('should determine if user can vote.', function() {
        timeTracker.isWeekDay = true;
        expect(user.canVoteOrSuggest()).toBe(true);

        timeTracker.isWeekDay = false;
        expect(user.canVoteOrSuggest()).toBe(false);
    });

});