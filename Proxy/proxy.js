/* jshint strict:false */
/* global console, require */
"use strict";
var http = require('http'), httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer({});
var request = require('request');

http.createServer(function(req, res) {
    handleRequest(req, res);
}).listen(3000, function(){
    console.log("Listening to port 3000 as proxy");
});

function handleRequest(req, res){
    proxy.web(req, res, {
        target: req.url
    });
}

proxy.on('proxyRes', function (proxyRes, req, res) {
    console.log("Sending POST to", req.url);
    request({
        method: "POST",
        url: "http://localhost:8080",
        json: true,
        body: {
            date: proxyRes.headers.date,
            contentType: proxyRes.headers["content-type"],
            url: req.url,
            status: proxyRes.statusCode,
            message: proxyRes.statusMessage
        }
    }, function(err, response, body){
        console.log(err, body);
    });
});

proxy.on('error', function(){
    console.log(":(");
});
