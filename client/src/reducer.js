import {List, Map} from 'immutable';

const INITIAL_STATE = Map({
    logs: List(),
    settings: Map()
});

export default function reducer(state = INITIAL_STATE, action){
    switch(action.type){
        case 'LOG':
            return state.update('logs', logs => addLog(logs, action.data));
    }
    return state;
}

export function addLog(logState, log){
    return logState.push(log);
}
