import Router from './router';
import Proxy from './proxy';
import AppState from './appState';
import request from 'request';
import express from 'express';

let app = express();
let state = new AppState();
let proxy = new Proxy(state);
let router = new Router(app, proxy, state);

app.listen(3000, () => {
    console.log("Starting proxy on port 3000");
});
