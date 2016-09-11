/**
 * Created by Christian on 2016-09-11.
 */
var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// This will make all the files in the current folder
// accessible from the web
app.use(express.static(__dirname + '/public' ));



// Listen for incoming connections from clients
io.sockets.on('connection', function (socket) {
    // Start listening for mouse events
    socket.on('mousemove', function (data) {
        // This line ends the event (broadcast it)
        // to everyone except the originating client.
        socket.broadcast.emit('moving', data);
    });
});

// This is the port for our web server.
// you will need to go to http://localhost:8080 to see it
http.listen(PORT, function(){
    console.log('Server started!')
});