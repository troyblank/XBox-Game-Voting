//#################################################################################################
// user
//#################################################################################################

describe('User', function() {

    beforeEach(function() {
        localStorage.clear();
    });

    //---------------------------------------------------------------------------------------------
    it('should determine if user can vote.', function() {
        timeTracker.isWeekDay = true;
        expect(user.determineCanVoteOrSuggest()).toBe(true);

        timeTracker.isWeekDay = false;
        expect(user.determineCanVoteOrSuggest()).toBe(false);
    });

    //---------------------------------------------------------------------------------------------
    it('should be able to toggle voting or suggestion privileges.', function() {
        user.setVoteOrSuggest(true);
        expect(user.canVoteOrSuggest).toBe(true);

        user.setVoteOrSuggest(false);
        expect(user.canVoteOrSuggest).toBe(false);
    });

});