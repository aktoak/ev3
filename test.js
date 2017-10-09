(function(ext) {
	
	var debugLevel = 0;

    //var device = null;
    var socket = null;

    var connected = false;
	
	var myStatus = 1; // initially yellow
    var myMsg = 'not_ready';
	
	
	ext.connect = function () {
        if(debugLevel)
            console.log('Connecting to Server');
        window.socket = new WebSocket("ws://127.0.0.1:9000");
        window.socket.onopen = function () {
            var msg = JSON.stringify({
                "command": "ready"
            });
            window.socket.send(msg);
            if(debugLevel)
                console.log("Connected!");
            myStatus = 2;
            myMsg = 'ready';
            connected = true;
        };
		
		
	
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
            [' ', 'Connect to websocket', 'connect'],
        ]
    };

    // Register the extension
    ScratchExtensions.register('Sample extension', descriptor, ext);
})({});