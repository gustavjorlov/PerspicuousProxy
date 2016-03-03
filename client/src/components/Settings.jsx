import React from 'react';

export default class Settings extends React.Component{

    constructor(){
        super();
        this.failvalue = 0;
    }

    changeScrollAttatchment(){
        // Keep scroll to bottom <input id="scollbottom" type="checkbox" />
        // <input ref="failrate" onMouseUp={this.setFailRate.bind(this)} value={this.failvalue} type="range" step="0.1" min="0" max="1" />
        // <p ref="failvalue">0</p>
    }
    setFailRate(failrate){
        // console.log("this.refs.failrate", this.refs.failrate.value);
        // this.failvalue = this.refs.failrate.value;

        this.props.settings('failrate', failrate);
        // this.refs.failvalue.innerHTML = this.refs.failrate.value*100 + " %";
        // this.refs.failrate.value = this.refs.failrate.value;
    }

    render(){
        return (
            <div id="settings">

                <button onClick={this.setFailRate.bind(this, 0)}>Fail none</button>
                <button onClick={this.setFailRate.bind(this, 0.1)}>Fail 10%</button>
                <button onClick={this.setFailRate.bind(this, 0.25)}>Fail 25%</button>
                <button onClick={this.setFailRate.bind(this, 0.75)}>Fail 75%</button>
                <button onClick={this.setFailRate.bind(this, 1)}>Fail all</button>
            </div>
        );
    }
}
