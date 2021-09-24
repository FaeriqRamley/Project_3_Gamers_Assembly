import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";

export default function Navigation() {
    return (
        <Navbar collapseOnSelect expand="lg" variant="dark" className="navigationbar">
            <Container>
                <Navbar.Brand href="#home">Gamers Assembly</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <SignedInLinks />
                    <SignedOutLinks />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
