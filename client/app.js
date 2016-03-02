var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var proxy = require('./../proxy');

init();

var socketHandle;

function init(){
    server.listen(8080, function(){
        console.log("Listening to port 8080 for browser");
    });
    proxy.run(function(data){
        socketHandle.emit('log', {
            url: data.url
        });
    });
}

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    console.log('connection');
    socketHandle = socket;
    socket.on('event', function (data) {
        console.log(data);
    });
});
