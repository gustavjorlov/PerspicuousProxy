import React from 'react';
import Log from './Log.jsx';

export default class LogList extends React.Component{
    render(){
        return (
            <div className="loglist">
                <table>
                    <thead>
                        <tr>
                            <td className="code">Code</td>
                            <td className="message">Status</td>
                            <td className="time">Time</td>
                            <td className="url">URL</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.logs.map( (item) => {
                            return <Log contentType={item.contentType} url={item.url} statusCode={item.status.code} statusMessage={item.status.message} date={item.date} />;
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}
