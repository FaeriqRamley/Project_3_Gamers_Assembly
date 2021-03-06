import React from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import { connect } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { logOut } from "../../store/actions/authActions";
import { useHistory } from "react-router-dom";

function SignedInLinks(props) {
  const history = useHistory();
  const { user } = props.auth.loggedUser;

  const handleLogOut = () => {
    props.logOut();
    history.push("/");
  };

  return (
    <>
      <Nav className="me-auto">
        <LinkContainer to="/dashboard">
          <Nav.Link className="nav-dashboard">Dashboard</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/search">
          <Nav.Link className="nav-search">Search</Nav.Link>
        </LinkContainer>
      </Nav>
      <Nav>
        <NavDropdown
          className="nav-user"
          title={user.userName}
          id="collasible-nav-dropdown"
        >
          <LinkContainer to={`/profile/${user._id}`}>
            <NavDropdown.Item>Profile</NavDropdown.Item>
          </LinkContainer>
          <NavDropdown.Divider />
          <LinkContainer to="/updateprofile">
            <NavDropdown.Item>Update Profile</NavDropdown.Item>
          </LinkContainer>
          <LinkContainer to="/changepassword">
            <NavDropdown.Item>Change Password</NavDropdown.Item>
          </LinkContainer>
          <NavDropdown.Item onClick={handleLogOut}>Log out</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(logOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignedInLinks);
