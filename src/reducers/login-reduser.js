import types from '../action-creators/types';
const initialState = {}
const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_ERROR:
            return Object.assign({}, state, {error: action.errorType});
        case types.RESET_STATE:
            return state = initialState
        default:
            return state;
    }
}

module.exports = loginReducer;