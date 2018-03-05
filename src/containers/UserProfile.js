import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import {connect} from 'react-redux';
import * as actions from '../action-creators/action-creator';
import {bindActionCreators} from 'redux';
import ChatModal from '../components/ChatModal';
import socket from '../socket-connection';
import {browserHistory} from 'react-router';


class UserProfile extends React.Component {
    constructor () {
        super ();
        this.handler = (ev) => {
            ev.preventDefault();
            return socket.emit('logout', (localStorage.getItem('email')));
        }
    }
    componentDidMount () {
        socket.emit('send username', localStorage.getItem('email'));    
        this.props.actions.getUser(this.props.location.query.email);
        window.addEventListener('beforeunload', this.handler);
    }
    componentWillUnmount () {
        this.props.actions.resetUserToLook();
        window.removeEventListener('beforeunload', this.handler);
    }
    render () {
        const user = this.props.data.userToLook || {};
        const localUserData = user.local;
        return (
            <div className="auth-background">
                <Grid>
                    <Row>
                        <Col >
                            {localUserData ? 
                                <div className="flex-container">
                                    <div className="user-profile">
                                        <button className="profile__logOut user-profile__button" onClick={() => {browserHistory.push('/panel')}}>Back</button>                
                                        <p className="user-profile__status">{localUserData.status == 'Not specified' ? '' : localUserData.status}</p>
                                        <div className="user-profile__thumbnail-container">
                                            <img className="user-profile__thumbnail" src={localUserData.thumbnail || 'https://www.reaganfoundation.org/umbraco/ucommerce/images/ui/image_not_found.jpg'} alt="user porfile photo"/>
                                        </div>
                                        <p className="user-profile__email">{localUserData.email}</p>
                                        <p className="user-profile__name">{localUserData.name == 'Not specified' ? '' : localUserData.name} {localUserData.lastName == 'Not specified' ? '' : localUserData.lastName}</p>
                                        <p className="user-profile__position">{localUserData.position == 'Not specified' ? '' : localUserData.position}  {localUserData.team == 'Not specified' ? '' : `in ${localUserData.team}`}</p>
                                        {localUserData.location == 'Not specified' ? null : <p className="user-profile__location">From: {localUserData.location}</p>}
                                    </div>
                                    <ChatModal 
                                        currentUser={localStorage.getItem('email')}
                                        selectedUser={localUserData.email}
                                    />
                                </div>
                                 : 
                                <p className="loading">Loading</p>
                            }
                        </Col>
                    </Row>
                </Grid>
            </div>
        ) 
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.data
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

UserProfile = connect(mapStateToProps, mapDispatchToProps)(UserProfile);

module.exports = UserProfile;