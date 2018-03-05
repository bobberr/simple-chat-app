import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router';

const SignUpSignIn = (props) => {
    return (
        <div className="auth-background">
            <Grid>
                <Row>
                    <Col lg={6} lgOffset={3} md={4} mdOffset={4} sm={6} smOffset={3} xs={8} xsOffset={2} className="hello-form">
                        <h3>Welcome</h3>
                        <Link className="hello-form__link" to="/log-in">Login</Link>
                        <Link className="hello-form__link" to="/sign-up">Registration</Link>                    
                    </Col>
                </Row>
            </Grid>    
        </div>
    )
}

module.exports = SignUpSignIn;