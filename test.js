/**
 * Created by asharafk on 10/9/17.
 */
(function(ext) {
	
	var debugLevel = 0;

    //var device = null;
    var socket = null;

    var connected = false;
	
	var myStatus = 1; // initially yellow
    var myMsg = 'not_ready';
	
	
	ext.connectwb = function () {
        //if(debugLevel)
            console.log('Connecting to Server');
        window.socket = new WebSocket("ws://localhost:5001");
        window.socket.onopen = function () {
            var msg = JSON.stringify({
                "connected succesfully"
            });
            window.socket.send(msg);
            //if(debugLevel)
                console.log("Connected!");
            myStatus = 2;
            myMsg = 'ready';
            connected = true;
        };
	}
		
		
	
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};
	
    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
		 // Block type, block name, function name
            [' ', 'Connect to websocket', 'connectwb'],
        ],
    };

    // Register the extension
    ScratchExtensions.register('Sample extension', descriptor, ext);
})({});