import React from 'react';
import LogList from './LogList.jsx';
import Settings from './Settings.jsx';

export default class Application extends React.Component{
    render(){
        return (
            <div id="application">
                <h1>Pretty Proxy</h1>
                <Settings settings={this.props.settings} />
                <LogList logs={this.props.logs}/>
            </div>
        );
    }
}
