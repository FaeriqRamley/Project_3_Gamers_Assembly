import React from "react";
import { Nav } from "react-bootstrap";

export default function SignedOutLinks() {
    return (
        <>
            <Nav className="me-auto"></Nav>
            <Nav>
                <Nav.Link className="nav-register" href="#register">Register</Nav.Link>
                <Nav.Link className="nav-login" href="#login">Log in</Nav.Link>
            </Nav>
        </>
    );
}
