import React from 'react';
import Log from './Log.jsx';

export default class LogList extends React.Component{

    // contentType: "text/html"
    // date: "Wed, 02 Mar 2016 22:30:12 GMT"
    // status: Object
    // code: 200
    // message: 200
    // __proto__: Object
    // url: "http://jorlov.se/"

    render(){
        console.log(this.props);
        return (
            <div className="loglist">{this.props.logs.map( (item) => {
                return <Log url={item.url} statusCode={item.status.code} date={item.date} />;
            })}</div>
        );
    }
}
