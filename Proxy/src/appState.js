export default class AppState {
    constructor(){
        console.log("# AppState constructor");
        this.state = {
            'fixed_number': 2, //number of requests to fail before all requests succeed
            'fail_rate': 0.2, // value*100 = % value
            'fail_type': '',
            'latency': 400 // time in ms
        };
    }
    addSetting(key, value){
        this.state[key] = value;
        console.log("setting added", this.state);
    }
    getSetting(key){
        return this.state[key];
    }
    getAllSettings(){
        return this.state;
    }
}
