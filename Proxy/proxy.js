/* jshint strict:false */
/* global console, require, process */
"use strict";
var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer({});
var request = require('request');
var express = require('express');

var app = express();
var settings = {
    latency: 0,
    failrate: 0,
    fiddler: false
};

if(process.argv[2]){
    settings.fiddler = "http://localhost:"+process.argv[2].split("=")[1];
}

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

app.all("*", function(req, res){
    handleRequest(req, res);
});

app.listen(3000, function(){
    console.log("Listening to port 3000 as proxy");
});

function handleRequest(req, res){
    console.log("handleRequest");
    setTimeout(function(){
        if(Math.random() > settings.failrate){
            proxy.web(req, res, {
                target: settings.fiddler || req.url
            }, handleError);
        }else{
            //res.sendStatus(404);
            messageToMonitor({
                date: new Date(),
                contentType: req.headers["content-type"],
                url: req.url,
                status: 999,
                message: "Failing"
            });
        }
    }, settings.latency);
}

proxy.on('proxyRes', function (proxyRes, req, res) {
    console.log("Handling "+req.method+" to", req.url);
    messageToMonitor({
        date: proxyRes.headers.date,
        contentType: proxyRes.headers["content-type"],
        url: req.url,
        status: proxyRes.statusCode,
        message: proxyRes.statusMessage
    });
});

proxy.on('error', function(){
    console.log(":(");
});


function handleError(e){
    console.log("ERROR", e);
}

function messageToMonitor(options){
    request({
        method: "POST",
        url: "http://localhost:9999",
        json: true,
        body: options
    }, function(err, response, body){
        if(err){console.log(err);}else{
            console.log(body.length);
        }
    });
}