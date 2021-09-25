import React from "react";
import { Navbar, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";

export default function Navigation() {
    return (
        <Navbar collapseOnSelect expand="lg" variant="dark" className="navigationbar">
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>Gamers Assembly</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <SignedInLinks />
                    <SignedOutLinks />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
