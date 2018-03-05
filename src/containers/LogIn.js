import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../action-creators/action-creator';

class LogIn extends React.Component {
    constructor () {
        super ();
        this.submitHandler = this.submitHandler.bind(this);
        this.state = {}
    }
    submitHandler (e) {
        e.preventDefault();
        this.props.actions.logIn(this.email.value, this.password.value);
        this.props.actions.resetState();        
    }
    render () {
        const props = this.props;
        return (
            <div className="auth-background">
                <Grid>
                    <Row>
                        <Col className="log-in">
                            <h3 className="log-in__title">Log in</h3>
                            <form onSubmit={this.submitHandler}>
                                <div className="log-in__container email-container">
                                    <input 
                                        type="text" 
                                        placeholder="Email" 
                                        ref={node => {this.email = node}} 
                                        className={props.loginState.error == 'userNotFound' ? "log-in__input warning" : "log-in__input"}
                                    />
                                </div>
                                {<p className={props.loginState.error == 'userNotFound' ? "log-in__not-found visible" : "log-in__not-found"}>
                                    User not found
                                </p>} 
                                <div className="log-in__container password-container">
                                    <input 
                                        type="password" 
                                        placeholder="Password" 
                                        ref={node => {this.password = node}} 
                                        className={props.loginState.error == 'wrongPassword' ? "log-in__input warning" : "log-in__input"}
                                    />
                                </div>                               
                                {<p className={props.loginState.error == 'wrongPassword' ? "log-in__not-found visible password" : "log-in__not-found password"}>
                                    Wrong password
                                </p>}                                
                                <input type="submit" value="Log in" className="log-in__submit"/>
                            </form>
                            <div className="log-in__support">
                                <p>Don't have an account?</p> 
                                <Link className="log-in__link" onClick={() => {this.props.actions.resetState()}} to="/sign-up">Create it! </Link>
                                or
                                <Link className="log-in__link" onClick={() => {this.props.actions.resetState()}} to="/"> Go to home page</Link>
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </div> 
            
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loginState: state.loginState
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

LogIn = connect(mapStateToProps, mapDispatchToProps)(LogIn);

module.exports = LogIn;