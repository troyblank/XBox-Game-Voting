//#################################################################################################
// event dispatcher
//#################################################################################################

describe('Event Dispatcher', function() {

    //---------------------------------------------------------------------------------------------
    it('should be able to broadcast and listen to an event.', function() {
        var dis = new EventDispatcher();
        var fired = false;
        dis.addEventListener('test', function() {
            fired = true;
        })

        dis.dispatchEvent('test');
        expect(fired).toBe(true);
    });

});