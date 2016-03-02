import ReactDOM from 'react-dom';
import React from 'react';
import Application from './components/Application.jsx';
import makeStore from './store';

var socket = io('http://localhost:8080');
const store = makeStore();
render({logs: []});



store.subscribe(function(){
    const state = store.getState();
    console.log("state", state);
    render(state);
});

socket.on('log', (data) => {
    console.log(data.status.code);
    store.dispatch({
        type: 'LOG',
        data: data
    });
});

function render(state){
    console.log("render with", state);
    ReactDOM.render(
        <Application logs={state.logs} />,
        document.getElementById("list")
    );
}
