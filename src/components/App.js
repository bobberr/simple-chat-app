import React from 'react';
import {createStore, compose, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {syncHistoryWithStore} from 'react-router-redux';
import {browserHistory, Route, Router} from 'react-router';
import thunk from 'redux-thunk'
import rootReducer from '../reducers/rootReducer';
import {autoRehydrate, persistStore} from 'redux-persist';
import {createFilter} from 'redux-persist-transform-filter';


import SignUpSignIn from '../components/SignUpSignIn';
import SignUp from '../containers/SignUp';
import LogIn from '../containers/LogIn';
import Profile from '../containers/Profile';
import Unauthorized from './Unauthorized';
import NotFound from './404';
import Tabs from './Tabs';
import UserProfile from '../containers/UserProfile';

const store = createStore(rootReducer, compose(applyMiddleware(thunk)), autoRehydrate());


persistStore(store, {blacklist: ['routing']});


class App extends React.Component {
  
    render () {
        return (
            <Provider store={store}>
                <Router history={browserHistory}>
                    <Route path="/" component={SignUpSignIn}/>
                    <Route path="/sign-up" component={SignUp}/>
                    <Route path="/log-in" component={LogIn}/>    
                    <Route path="/panel" component={Tabs}/>
                    <Route path="/panel/profile" component={UserProfile}/>
                    <Route path="/unauthorized" component={Unauthorized}/> 
                    <Route path="*" component={NotFound}/>          
                </Router>
            </Provider>
        )
    }
}

module.exports = App;
