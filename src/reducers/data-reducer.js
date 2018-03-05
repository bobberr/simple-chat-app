import types from '../action-creators/types';
const initialState = {

}

const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_USER_LIST:
            return Object.assign({}, state, {allUsers: action.users});
        case types.SET_USER:
            return Object.assign({}, state, {user: action.user});
        case types.SET_USER_TO_LOOK:
            return Object.assign({}, state, {userToLook: action.user});
        case types.RESET_STATE:
            return state = initialState;
        case types.RESET_USER_TO_LOOK:
            return Object.assign({}, state, {userToLook: null});
        default:
            return state;
    }
}

module.exports = dataReducer;