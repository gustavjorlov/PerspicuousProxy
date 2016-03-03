import React from 'react';

export default class Log extends React.Component{
    getStatusClassName(statusCode){
        switch(statusCode){
            case 200:
                return "status_ok";
            case 302:
                return "status_decent";
            case 404:
                return "status_fail";
            case 500:
                return "status_fail_hard";
            case 999:
                return "status_manual_timeout";
        }
        return "status_unknown";
    }
    render(){
        const date = new Date(this.props.date);
        return (
            <div className="log">
                <span className={'status ' + this.getStatusClassName(this.props.statusCode)}>{this.props.statusCode}</span>
                <span className="message">{this.props.statusMessage}</span>
                <span className="date">{date.toTimeString().slice(0,8)}</span>
                <span className="url">{this.props.url}</span>
            </div>
        );
    }
}
