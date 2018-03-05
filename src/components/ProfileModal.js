import React from 'react';
import {Modal} from 'react-bootstrap';

class ProfileModal extends React.Component {
    render () {
        const userData = this.props.userData;
        return (
            <Modal className="profile-modal" show={this.props.showModal} onHide={this.props.hideModal}>
                <h3 className="profile-modal__title">Change your profile info</h3>
                <form className="profile-modal__form" onSubmit={(e) => {
                                        this.props.changeHandler(
                                                                    e, this.name.value, 
                                                                    this.lastName.value, 
                                                                    this.postition.value,
                                                                    this.team.value,
                                                                    this.location.value,
                                                                    this.status.value
                                        )}}
                >
                    <label htmlFor="name">Name</label>
                    <input id="name" type="text" ref={ref => {this.name = ref}} defaultValue={userData.name || 'Not specified'}/>
                    <label htmlFor="lastname">Last Name</label>
                    <input id="lastname" type="text" ref={ref => {this.lastName = ref}} defaultValue={userData.lastName || 'Not specified'}/>
                    <label htmlFor="position">Position</label>
                    <input id="postition" type="text" ref={ref => {this.postition = ref}} defaultValue={userData.position || 'Not specified'}/>
                    <label htmlFor="team">Team name</label>
                    <input id="team" type="text" ref={ref => {this.team = ref}} defaultValue={userData.team || 'Not specified'}/>
                    <label htmlFor="location">Location</label>
                    <input id="location" type="text" ref={ref => {this.location = ref}} defaultValue={userData.location || 'Not specified'}/>
                    <label htmlFor="status">Status</label>
                    <input id="status" type="text" ref={ref => {this.status = ref}} defaultValue={userData.status || 'Not specified'}/>
                    <input type="submit" value="Edit profile"/>
                    <button className="profile-modal__delete" onClick={this.props.deleteAccount}>Delete account</button>
                </form>
                
            </Modal>
        )
    }
}

module.exports = ProfileModal;