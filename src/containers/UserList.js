import {Link} from 'react-router';
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import * as actions from '../action-creators/action-creator';
import socket from '../socket-connection';

class UserList extends React.Component {
    componentWillMount () {
        this.props.actions.getAllUsers(localStorage.getItem('email'));
    }
    clickHandler (user) {
        browserHistory.push(`/panel/profile?email=${user}`);
    }
    render () {
        ['changed photo', 'changed user data'].forEach(event => {
            socket.on(event, () => {
                this.props.actions.getAllUsers(localStorage.getItem('email'));
            });
        });
        const users = this.props.users || [];
        const userList = users.map((user) => {
            return (
                <div onClick={() => {this.clickHandler(user.local.email)}} key={user._id} className="user-item">
                    <img 
                        src={user.local.thumbnail || 'http://www.allkpop.com/upload/2014/05/af_org/EXO-EXO-M-Sehun-Kris_1400144013_af_org.jpeg'} 
                        className="user-item__thumbnail" 
                        alt="thumbnail"/>
                    <p className="user-item__name">{user.local.name == "Not specified" ? 'No name' : user.local.name}  {user.local.lastName == "Not specified" ? 'No last name' : user.local.lastName}</p>    
                    <p className="user-item__email">Email: {user.local.email}</p>
                    {user.local.logged ? <p className="user-item__indicator online">Online</p> : <p className="user-item__indicator offline">Offline</p>}
                </div>
            )
        });
        return (
            <div className="user-list">
                {userList}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.data.allUsers
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

UserList = connect(mapStateToProps, mapDispatchToProps)(UserList);

module.exports = UserList;