import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default function SignedOutLinks() {
    return (
        <>
            <Nav className="me-auto"></Nav>
            <Nav>
                <LinkContainer to="/register">
                    <Nav.Link className="nav-register" to="/register">Register</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/login">
                    <Nav.Link className="nav-login">Log in</Nav.Link>
                </LinkContainer>
            </Nav>
        </>
    );
}
