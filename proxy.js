/* jshint strict:false */
/* global console, require */
"use strict";
var http = require('http'), httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer({});

module.exports = {
    run: BadProxy
};

function BadProxy(callback){
    http.createServer(function(req, res) {
        callback({url: req.url});
        handleRequest(req, res);
    }).listen(3000, function(){
        console.log("Listening to port 3000 as proxy");
    });
}

function handleRequest(req, res){
    proxy.web(req, res, {
        target: req.url
    });
}

var Output = (function(){
    function _formatQueryString(queryString){
        return !queryString ? "" : queryString.split("&").map(function(item){
            return "\t" + (item.split("=")[0]+"                ").slice(0,15) + item.split("=")[1];
        }).join("\n");
    }
    function printRequest(url){
        return "\n"+url.split("?")[0] + _formatQueryString(url.split("?")[1]);
    }
    return {
        printRequest: printRequest
    };
})();
