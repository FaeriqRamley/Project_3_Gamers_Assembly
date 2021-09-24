import React from "react";
import { Nav } from "react-bootstrap";

export default function SignedInLinks() {
    return (
        <>
            <Nav className="me-auto">
                <Nav.Link className="nav-dashboard" href="#dashboard">Dashboard</Nav.Link>
                <Nav.Link className="nav-search" href="#search">Search</Nav.Link>
            </Nav>
            <Nav>
                <Nav.Link className="nav-logout" href="#logout">Log out</Nav.Link>
            </Nav>
        </>
    );
}
