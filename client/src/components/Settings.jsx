import React from 'react';

export default class Settings extends React.Component{
    render(){
        return (
            <div id="settings">
                <h2>Settings</h2>
                Keep scroll to bottom <input id="scollbottom" type="checkbox" />
            </div>
        );
    }
}
