import React from "react";
import { Nav } from "react-bootstrap";
import { connect } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { logOut } from "../../store/actions/authActions";
import { useHistory } from "react-router-dom"

function SignedInLinks(props) {
    const history = useHistory();

    const handleLogOut = () => {
        props.logOut();
        history.push("/")
    }
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
                <Nav.Link className="nav-logout" onClick={handleLogOut}>
                    Log out
                </Nav.Link>
            </Nav>
        </>
    );
}

const mapStateToDispatch = (dispatch) => {
    return {
        logOut: () => dispatch(logOut())
    }
}

export default connect(null, mapStateToDispatch)(SignedInLinks)