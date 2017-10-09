(function(ext) {
	
	var debugLevel = 0;

    //var device = null;
    var socket = null;

    var connected = false;
	
	var myStatus = 1; // initially yellow
    var myMsg = 'not_ready';
	
	
	ext.connect = function () {
        //if(debugLevel)
            console.log('Connecting to Server');
        window.socket = new WebSocket("ws://localhost:5001");
        window.socket.onopen = function () {
            var msg = JSON.stringify({
                "connection is successfull"
            });
            window.socket.send(msg);
           // if(debugLevel)
                console.log("Connected!");
            myStatus = 2;//ready
            myMsg = 'ready';
            connected = true;
        };
		
		
		 window.socket.onmessage = function (message) {
		 };
		 
		 //noinspection JSUnusedLocalSymbols
		 window.socket.onclose = function (e) {
            console.log("Connection closed.");
            socket = null;
            connected = false;
            myStatus = 1;
            myMsg = 'not_ready'
        };
		
	}
		
		
	
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {
		// var msg = JSON.stringify({
       //     "connection was shut down"
       // });
        //window.socket.send(msg);
	};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'myMsg'};
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
		 // Block type, block name, function name
            [' ', 'Connect to websocket', 'connect'],
        ],
		
    };

    // Register the extension
    ScratchExtensions.register('Sample extension', descriptor, ext);
})({});