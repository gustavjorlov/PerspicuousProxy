var request = require('request');
var chai = require('chai');
var expect = chai.expect;

describe("Proxy", function(){
    this.timeout(12000);
    it("should return google.com", function(done){
        send("http://www.google.com", "GET", done);
    });
    it("should return asdfcadcsdc.com", function(done){
        send("http://www.asdfcadcsdc.com", "GET", done);
    });
    it("should send a POST to jorlov.se", function(done){
        send("http://jorlov.se", "POST", done);
    });
    it("should send a GET to sj.se", function(done){
        send("http://www.sj.se", "GET", done);
    });
    it("should send a GET to skistar.se", function(done){
        send("http://www.skistar.se", "GET", done);
    });
    it("should send a GET to johannastromberg.se", function(done){
        send("http://www.johannastromberg.se", "GET", done);
    });
    it("should send a GET to strava.com", function(done){
        send("http://www.strava.com", "GET", done);
    });
    it("should send a GET to volvocars.se", function(done){
        send("http://www.volvocars.se", "GET", done);
    });

    function send(url, method, done){
        request({
            url: url,
            method: method,
            proxy: "http://localhost:3000"
        }, function(err, response, body){
            console.log(err, response.statusCode);
            done();
        });
    }
});
