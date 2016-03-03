import ReactDOM from 'react-dom';
import React from 'react';
import Application from './components/Application.jsx';
import makeStore from './store';

var socket = io('http://localhost:9999');
const store = makeStore();
render(store.getState().toJS());

store.subscribe( () => {
    render(store.getState().toJS());
});

socket.on('log', (data) => {
    console.log(data.status.code);
    store.dispatch({
        type: 'LOG',
        data: data
    });
});

function updateScroll(){
    let element = document.getElementsByClassName("loglist")[0];
    element.scrollTop = element.scrollHeight;
}

function handleSettings(setting, value){
    socket.emit('setting', {
        value: value,
        setting: setting
    });
}

function render(state){
    console.log("render with", state);
    ReactDOM.render(
        <Application settings={handleSettings} logs={state.logs} />,
        document.getElementById("list")
    );
    updateScroll();
}
