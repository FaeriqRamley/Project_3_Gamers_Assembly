import React from "react";
import { Navbar, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { connect } from "react-redux"

function Navigation(props) {
    const { auth } = props
    return (
        <Navbar collapseOnSelect sticky="top" expand="lg" variant="dark" className="navigationbar">
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>Gamers Assembly</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    { auth.loggedUser 
                    ? <SignedInLinks /> 
                    : <SignedOutLinks />
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}
export default connect(mapStateToProps)(Navigation);