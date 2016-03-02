import React from 'react';
import LogList from './LogList.jsx';

export default class Application extends React.Component{
    render(){
        return (
            <div><LogList {...this.props}/></div>
        );
    }
}
