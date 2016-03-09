var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');
var request = require('request');

var socketHandle;

app.use(express.static(__dirname + "/dist"));
app.use(bodyParser.json());

app.post('/', function(req, res){
    console.log("POST to / with ", req.body.url);
    socketHandle.emit('log', {
        date: req.body.date,
        contentType: req.body.contentType,
        duration: req.body.duration,
        url: req.body.url,
        status: {
            code: req.body.status,
            message: req.body.message
        }
    });
    res.sendStatus(200);
});

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/dist/index.html');
});

io.on('connection', function (socket) {
    console.log('connection');
    socket.on('setting', function (data) {
        console.log(data);
        request({
            url: "http://localhost:3000/settings/failrate/"+data.value,
            method: "POST"
        }, function(err, response, body){
            console.log("Setting", err, body);
        });
    });
    socketHandle = socket;
});

server.listen(9999, function(){
    console.log("Listening to port 9999 for browser");
});
