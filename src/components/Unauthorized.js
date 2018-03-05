import {Link} from 'react-router';
import {Grid, Row, Col} from 'react-bootstrap';
import React from 'react';

const Unauthorized = () => {
    return (
        <div className="auth-background">
            <Grid>
                <Row>
                    <Col className="unauth">
                        <p className="unauth__title">It looks like you are unathorized to access this page!</p>
                        <div>
                            <Link className="unauth__link" to="/log-in">Log in</Link>
                            or 
                            <Link className="unauth__link" to="/">Go home</Link>
                        </div>
                    </Col>
                </Row>
            </Grid>
        </div>
    )
}

module.exports = Unauthorized;