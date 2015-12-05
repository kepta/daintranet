import { combineReducers } from 'redux';
import { LOGGED_IN, LOGGED_OUT, LOGGING } from './actions';

const initialState = {
    LOGIN: LOGGED_OUT,
};
function login(state = initialState.LOGIN, action) {
    console.log(action.type);
    switch (action.type) {
    case LOGGED_IN:
        return LOGGED_IN;
    case LOGGED_OUT:
        return LOGGED_OUT;
    case LOGGING:
        return LOGGING;
    default:
        return state;
    }
}
const reducer = combineReducers({
    login,
});

export default reducer;
