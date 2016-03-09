/* jshint strict:false */
/* global console, require, process */
"use strict";
var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer({});
var request = require('request');
var express = require('express');
var monitorUrl = "http://localhost:9999";
var FAIL_TYPES = {
    'SUCCESS': 200,
    'TIMEOUT': 999,
    'NOT_FOUND': 404,
    'SERVER_ERROR': 500
};
var Settings = SettingsEngine();
init();

function init(){
    var app = express();
    _readCommandLineSettings(process.argv);
    _registerRoutes(app);
    app.listen(3000, function(){ console.log("Listening to port 3000 as proxy"); });
}

function _readCommandLineSettings(args){
    if(args[2]){ Settings.set('fiddler', "http://localhost:"+args[2].split("=")[1]); }
}

function _registerRoutes(app, settings){
    app.post("/settings/:setting/:value", function(req, res){
        Settings.set(req.params.setting, req.params.value, sendResponse.bind(null, res));
        console.log(req.params.setting, req.params.value);
    });

    app.all("*", handleRequest);

    function sendResponse(res, err){
        if(err){ res.sendStatus(500); }else{
            res.sendStatus(200);
        }
    }
}

function handleRequest(req, res){
    var requestHandling = applyRulesToRequest(req, res);
    console.log(requestHandling);
    setTimeout(function(){
        if(requestHandling.status === 200){
            sendRequestViaProxy(req, res);
        }else{
            res.status(Number(requestHandling.status));
            res.send(Number(requestHandling.status));
            sendMessageToMonitor({
                date: new Date(),
                contentType: req.headers["content-type"],
                url: req.url,
                status: requestHandling.status,
                message: "Failed by Pretty Proxy"
            });
        }
    }, requestHandling.latency);
}


function applyRulesToRequest(){
    var failResult = [failWithPercent, failForTimeSince].map(function(chainFunc){
        return chainFunc();
    }).filter(function(item){
        return item !== FAIL_TYPES.SUCCESS;
    });

    return {
        status: failResult.length === 0 ? FAIL_TYPES.SUCCESS : failResult[0],
        latency: getLatency()
    };
}

function failWithPercent(req, res){
    if(Math.random() > Settings.get('failrate')){
        return FAIL_TYPES.SUCCESS;
    }else{
        return FAIL_TYPES.TIMEOUT;
    }
}
function failForTimeSince(req, res){
    return FAIL_TYPES.SUCCESS;
}
function getLatency(){
    return Math.random()*Settings.get('latency');
}

function sendRequestViaProxy(req, res){
    proxy.web(req, res, {
        target: Settings.get('fiddler') || req.url
    }, handleError);
}
proxy.on('proxyRes', function (proxyRes, req, res) {
    console.log("Handling "+req.method+" to", req.url);
    sendMessageToMonitor({
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

function sendMessageToMonitor(options){
    request({
        method: "POST",
        url: monitorUrl,
        json: true,
        body: options
    }, function(err, response, body){
        if(err){console.log(err);}else{
            console.log("Monitor got it");
        }
    });
}

function SettingsEngine(){
    var settings = {
        latency: 1000,
        failrate: 0,
        duration: 0,
        sinceTime: 0,
        failtype: 'rate', //'rate', 'time'
        fiddler: false
    };
    function setSetting(key, value){
        settings[key] = value;
        console.log("settings saved", settings);
    }
    function getSetting(key){
        return settings[key];
    }
    function getSettings(){
        return settings;
    }
    return {
        get: getSetting,
        getAll: getSettings,
        set: setSetting
    }
};
