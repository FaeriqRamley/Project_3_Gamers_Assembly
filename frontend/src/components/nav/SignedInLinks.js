import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default function SignedInLinks() {
    return (
        <>
            <Nav className="me-auto">
                <LinkContainer to="/dashboard">
                    <Nav.Link className="nav-dashboard">
                        Dashboard
                    </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/search">
                    <Nav.Link className="nav-search">
                        Search
                    </Nav.Link>
                </LinkContainer>
            </Nav>
            <Nav>
                <Nav.Link className="nav-logout">Log out</Nav.Link>
            </Nav>
        </>
    );
}
