import React from 'react';

export default class Log extends React.Component{
    render(){
        console.log("Log", this.props);
        const date = new Date(this.props.date);
        return (
            <div className="log">
                <span className={this.props.statusCode === 200 ? 'status_ok' : 'status_fail'}>{this.props.statusCode}</span>
                <span className="date">{date.toTimeString().slice(0,8)}</span>
                <span className="url">{this.props.url}</span>
            </div>
        );
    }
}
