import React from 'react';

export default class Settings extends React.Component{

    changeScrollAttatchment(){

    }
    setFailRate(failrate){
        console.log("setFailRate", failrate)
        this.props.settings('failrate', failrate);
    }

    render(){
        return (
            <div id="settings">
                <h2>Settings</h2>
                Keep scroll to bottom <input id="scollbottom" type="checkbox" />
                <button onClick={this.setFailRate.bind(this, 0)}>Fail none</button>
                <button onClick={this.setFailRate.bind(this, 0.1)}>Fail 10%</button>
                <button onClick={this.setFailRate.bind(this, 0.25)}>Fail 25%</button>
                <button onClick={this.setFailRate.bind(this, 0.75)}>Fail 75%</button>
                <button onClick={this.setFailRate.bind(this, 1)}>Fail all</button>
            </div>
        );
    }
}
