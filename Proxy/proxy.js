/* jshint strict:false */
/* global console, require */
"use strict";
var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer({});
var request = require('request');
var express = require('express');

var app = express();
var settings = {
    latency: 400,
    failrate: 0
}

app.get("/", function(req, res){
    handleRequest(req, res);
});

app.post("/", function(req, res){
    handleRequest(req, res);
});

app.post("/settings/:setting/:value", function(req, res){
    switch(req.params.setting){
        case 'failrate':
            settings.failrate = req.params.value;
            break;
        case 'latency':
            settings.latency = req.params.value;
            break;
    }
    console.log(req.params.setting, req.params.value);
});

app.listen(3000, function(){
    console.log("Listening to port 3000 as proxy");
});

function handleRequest(req, res){
    setTimeout(function(){
        if(Math.random() > settings.failrate){
            proxy.web(req, res, {
                target: req.url
            }, handleError);
        }else{
            res.sendStatus(404);
            request({
                method: "POST",
                url: "http://localhost:8080",
                json: true,
                body: {
                    date: new Date(),
                    contentType: req.headers["content-type"],
                    url: req.url,
                    status: 999,
                    message: "Failing"
                }
            }, function(err, response, body){
                console.log(err, body);
            });
        }
    }, settings.latency);
}

function handleError(e){
    console.log("ERROR", e);
}

proxy.on('proxyRes', function (proxyRes, req, res) {
    console.log("Handling "+req.method+" to", req.url);
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
