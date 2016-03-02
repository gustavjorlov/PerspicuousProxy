export default function reducer(state = {logs:[]}, action){
    console.log("ACTION", action.type);
    switch(action.type){
        case 'LOG':
            return addLog(state, action.data);
    }
    return state;
}

function addLog(state, log){
    return {logs: state.logs.concat(log) };
}
