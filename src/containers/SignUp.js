import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../action-creators/action-creator';

class SignUp extends React.Component {
    constructor () {
        super ();
        this.submitHandler = this.submitHandler.bind(this);
        this.state = {}
    }
    submitHandler (e) {
        e.preventDefault();
        this.setState({wrongEmail: false});
        const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (this.email.value.match(emailRegExp) && this.password.value.length > 0) {
            this.props.actions.signUp(this.email.value, this.password.value);
        } else {
            this.setState({
                wrongEmail: true
            })
        }
    }
    render () {
        const props = this.props;
        return (
            <div className="auth-background">
                <Grid>
                    <Row>
                        <Col className="log-in">
                            <h3 className="log-in__title">Registration</h3>
                            <form onSubmit={this.submitHandler}>
                                <div className="log-in__container email-container">
                                    <input 
                                        id="email" 
                                        type="text" 
                                        ref={node => {this.email = node}}
                                        className={this.state.wrongEmail || props.loginState.error == 'emailInUse' ? "log-in__input warning" : "log-in__input"}
                                        placeholder="Email"
                                    />
                                </div>
                                {<p className={props.loginState.error == 'emailInUse' ? "log-in__not-found visible" : "log-in__not-found"}>Email in use</p>}
                                <div className="log-in__container password-container">
                                    <input 
                                        id="pass" 
                                        type="password"
                                        ref={node => {this.password = node}}
                                        className={this.state.wrongEmail ? "log-in__input warning" : "log-in__input"}
                                        placeholder="Password"
                                    />
                                </div>
                                {<p className={this.state.wrongEmail ? "log-in__not-found visible password" : "log-in__not-found password"}>Wrong email or password to small</p>}
                                <input type="submit" value="Create account" className="log-in__submit"/>
                            </form>
                            <div className="log-in__support">
                                <p>Already have an account?</p> 
                                <Link className="log-in__link" onClick={() => {this.props.actions.resetState()}} to="/log-in">Log in</Link>
                                or
                                <Link className="log-in__link" onClick={() => {this.props.actions.resetState()}} to="/">Go home</Link>
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

SignUp = connect(mapStateToProps, mapDispatchToProps)(SignUp);

module.exports = SignUp;