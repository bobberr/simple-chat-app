import {Link} from 'react-router';
import {Grid, Row, Col} from 'react-bootstrap';
import React from 'react';

const NotFound = () => {
    return (
        <div className="auth-background">
            <Grid>
                <Row>
                    <Col className="page404">
                        <p className="page404__title">404 not found</p>
                        <p className="page404__text">It looks like there is no such page</p>
                        <Link className="page404__link" to="/">Go home</Link>
                    </Col>
                </Row>
            </Grid>
        </div>
    )
}

module.exports = NotFound;