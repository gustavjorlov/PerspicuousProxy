var request = require('request');
var chai = require('chai');
var expect = chai.expect;

describe("Proxy", function(){
    this.timeout(10000);
    it("should return google.com", function(done){
        var options = {
            url: "http://google.com",
            proxy: "http://localhost:3000"
        };

        request(options, function(err, response, body){
            done();
        });
    });
    it("should send a POST to jorlov.se", function(done){
        var options = {
            url: "http://jorlov.se",
            method: "POST",
            proxy: "http://localhost:3000"
        };

        request(options, function(err, response, body){
            done();
        });
    })
});
