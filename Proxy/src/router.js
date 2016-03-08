export default class Router {
    constructor(app, proxy, appState){
        console.log("# Router constructor", proxy);
        this.appState = appState;
        this.proxy = proxy;
        this.app = app;
        this.registerRoutes();
    }

    registerRoutes(){
        this.app.post("/settings/:setting/:value", this.addSetting.bind(this));
        this.app.all("*", this.proxy.handleRequest.bind(this.proxy));
    }

    addSetting(req, res){
        this.appState.addSetting(req.params.setting, req.params.value);
        console.log(req.params.setting, req.params.value);
    }
}
