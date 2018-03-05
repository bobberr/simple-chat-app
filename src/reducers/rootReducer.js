import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import loginReducer from './login-reduser';
import dataReducer from './data-reducer';

const combineReducer = combineReducers({routing: routerReducer, loginState: loginReducer, data: dataReducer});

module.exports = combineReducer;