import React from 'react';
import axios from 'axios';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import * as actions from '../action-creators/action-creator';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import ReactFilestack from 'filestack-react';

import ProfileModal from '../components/ProfileModal';


class Profile extends React.Component {
    constructor () {
        super ();
        this.successHandler = this.successHandler.bind(this);
        this.state = {
            imageUrl: null,
            showModal: false
        }
        this.hideModal = this.hideModal.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
    }
    componentDidMount () {
        this.props.actions.profileOnLoad();
    }
    successHandler (e) {
        this.setState({
            imageUrl: e.filesUploaded[0].url
        });
        this.props.actions.setPhoto(this.state.imageUrl);
    }
    hideModal () {
        this.setState({
            showModal: false
        });
    }
    changeHandler (e, name, lastName, position, team, location, status) {
        e.preventDefault();
        this.props.actions.changeUserData(name, lastName, position, team, location, status);
    }
    render () {
        const user = this.props.data.user || {};
        const localUserData = user.local || {};
        return (
            <div className="profile">
                <button className="profile__logOut" onClick={() => {this.props.actions.logOut(localUserData.email)}}>Log out</button>                
                <p className="profile__status">{localUserData.status == 'Not specified' ? '' : localUserData.status}</p>
                <div className="profile__thumbnail-container">
                    <img className="profile__thumbnail" src={localUserData.thumbnail || this.state.imageUrl || 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Question_Mark.svg/2000px-Question_Mark.svg.png'} alt=""/>
                    <ReactFilestack
                        apikey='Akw5hhxsITk2bGmTBsycBz'
                        buttonText=""
                        buttonClass="profile__image-button profile__button"
                        onSuccess={this.successHandler}
                    />
                    <button className="profile__edit-button profile__button" onClick={() => {this.setState({showModal: true})}}></button>
                </div>
                <p className="profile__email">{localUserData.email}</p>
                <p className="profile__name">{localUserData.name == 'Not specified' ? '' : localUserData.name} {localUserData.lastName == 'Not specified' ? '' : localUserData.lastName}</p>
                <p className="profile__position">{localUserData.position == 'Not specified' ? '' : localUserData.position}  {localUserData.team == 'Not specified' ? '' : `in ${localUserData.team}`}</p>
                {localUserData.location == 'Not specified' || undefined ? null : <p className="profile__location"> From: {localUserData.location}</p>}
                <ProfileModal 
                    deleteAccount={this.props.actions.deleteAccount}
                    showModal={this.state.showModal} 
                    hideModal={this.hideModal} 
                    userData={localUserData}
                    changeHandler={this.changeHandler}
                />
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

Profile = connect(mapStateToProps, mapDispatchToProps)(Profile);

module.exports = Profile;