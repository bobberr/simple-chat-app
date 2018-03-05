import React from 'react';
import {Tabs, Tab, Grid, Row, Col} from 'react-bootstrap';
import Profile from '../containers/Profile';
import UserList from '../containers/UserList';
import Wall from '../containers/Wall';
import socket from '../socket-connection';


class UserTabs extends React.Component {
    constructor () {
        super ();
        this.handler = (ev) => {
            ev.preventDefault();
            return socket.emit('logout', (localStorage.getItem('email')));
        }
    }
    componentDidMount () {
        socket.emit('send username', (localStorage.getItem('email')));   
        window.addEventListener('beforeunload', this.handler);     
    }
    componentWillUnmount () {
        window.removeEventListener('beforeunload', this.handler);
    }
    render () {
        return (
            <div className="auth-background">
                <Grid>
                    <Row>
                        <Col className="tabs">
                            <Tabs defaultActiveKey={1} animation={true} id="user-tabs">
                                <Tab eventKey={1} title="Profile"><Profile/></Tab>
                                <Tab eventKey={2} title="Group Chat"><Wall/></Tab>
                                <Tab eventKey={3} title="Userlist"><UserList/></Tab>
                            </Tabs>
                        </Col>
                    </Row>
                </Grid>
            </div> 
        )
    }
}

module.exports = UserTabs;