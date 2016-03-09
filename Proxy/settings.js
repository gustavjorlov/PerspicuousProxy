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

module.exports = SettingsEngine();
