import httpProxy from 'http-proxy';
import request from 'request';

class FailEngine{
    constructor(appState){
        console.log("# FailEngine constructor");
        this.HTTP = {
            OK: 200,
            PARTIAL_CONTENT: 204,
            MOVED_PERMANENTLY: 301,
            FOUND: 302,
            NOT_MODIFIED: 304,
            BAD_REQUEST: 400,
            UNAUTHORIZED: 401,
            FORBIDDEN: 403,
            NOT_FOUND: 404,
            METHOD_NOT_ALLOWED: 405,
            NOT_ACCEPTABLE: 406,
            REQUEST_TIMEOUT: 408,
            SERVER_ERROR: 500,
            NOT_IMPLEMENTED: 501,
            BAD_GATEWAY: 502,
            SERVICE_UNAVAILABLE: 503
        };
        this.appState = appState;
    }

    nextRequest(req, res, success, error){
        const failType = this.appState.getSetting('fail_type');
        switch(failType){
            case 'percent':
                this.failRate(req, res, this.appState.getSetting('fail_rate'), success, error);
            break;
            case 'fixed_number':
                this.failFixed(req, res, this.appState.getSetting('fail_fixed_number'), success, error);
            break;

        }
        this.failRate(req, res, this.appState.getSetting('fail_rate'), success, error);
        // res.sendStatus(this.HTTP.NOT_FOUND);
        // callback();
    }

    failRate(req, res, failrate, success, error){
        console.log("failRate");
        if(Math.random() > failrate){
            success();
        }else{
            res.sendStatus(this.HTTP.SERVER_ERROR);
            error(this.HTTP.SERVER_ERROR);
        }
    }

    failFixed(){

    }

    setFailSetting(){

    }
}


export default class Proxy {
    constructor(appState){
        console.log("# Proxy constructor");
        this.proxy = httpProxy.createProxyServer({});
        this.appState = appState;
        this.failEngine = new FailEngine(appState);
    }
    handleRequest(req, res){
        this.failEngine.nextRequest(req, res, () => {
            console.log("Not failed by engine");
            this.proxy.web(req, res, {
                target: req.url
            }, this.handleError);
        });
    }
    handleError(err){
        console.log("Error...", err);
    }
}
