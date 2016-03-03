import React from 'react';
import Log from './Log.jsx';

export default class LogList extends React.Component{
    render(){
        return (
            <div className="loglist">{this.props.logs.map( (item) => {
                return <Log contentType={item.contentType} url={item.url} statusCode={item.status.code} statusMessage={item.status.message} date={item.date} />;
            })}</div>
        );
    }
}
