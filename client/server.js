var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');

var socketHandle;

app.use(express.static(__dirname + "/dist"));
app.use(bodyParser.json());

app.post('/', function(req, res){
    console.log("POST to /", req.body);
    socketHandle.emit('log', {
        date: req.body.date,
        contentType: req.body.contentType,
        url: req.body.url,
        status: {
            code: req.body.status,
            message: req.body.status
        }
    });
});

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/dist/index.html');
});

io.on('connection', function (socket) {
    console.log('connection');
    socket.on('event', function (data) {
        console.log(data);
    });
    socketHandle = socket;
});

server.listen(8080, function(){
    console.log("Listening to port 8080 for browser");
});
