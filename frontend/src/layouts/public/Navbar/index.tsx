import { useRef, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { Nav, Navbar, Dropdown } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { navbarBrand, navs, withRouter } from "../../../util";
import logoImage from "../../../assets/images/logo.png";
import { connect } from "react-redux";
import { logoutUser } from "../../../store/action";
import './Navbar.css';
import type { RootState } from "../../../store/store";
import type { FC } from "react";

interface AuthState {
  isAuthenticated: boolean;
}

interface StateProps {
  auth: AuthState;
}

interface DispatchProps {
  logoutUser: () => void;
}

type Props = StateProps & DispatchProps;

const NavBar: FC<Props> = (props:any) => {
  const navRef = useRef<HTMLDivElement | null>(null);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

  const handleNavClick = () => {
    setIsCollapsed(true);
  };

  return (
    <>
      <Navbar
          ref={navRef}
          className="navbar"
          variant="dark"
          expand="lg"
          fixed="top"
          expanded={!isCollapsed}
        >
          <Navbar.Brand className="nav-brand" href="/">
            <img src={logoImage} alt="Logo" className="logo" />
            {navbarBrand}
          </Navbar.Brand>
          {isCollapsed ? (
            <Navbar.Toggle
              className="border-0"
              aria-controls="basic-navbar-nav"
              onClick={() => setIsCollapsed(false)}
            />
            ) : (
              <IoCloseOutline
                size={40}
                className="close-btn"
                onClick={() => setIsCollapsed(true)}
              />
            )}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="nav mr-auto" onClick={handleNavClick}>
              {navs.map((navItem: any) => (
                <Nav.Link className="nav-item" as={Link} to={navItem.page} key={uuidv4()}>
                    {navItem.nav}
                </Nav.Link>
              ))}

              {props.auth.isAuthenticated ? (
              <>
                  <Nav.Link className="nav-item d-block d-lg-none" as={Link} to="/preferences">Preference</Nav.Link>
                  <Nav.Link className="nav-item d-block d-lg-none" as={Link} to="/#" onClick={props.logoutUser}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link className="nav-item d-block d-lg-none" as={Link} to="/login">Login</Nav.Link>
                <Nav.Link className="nav-item d-block d-lg-none" as={Link} to="/register">Register</Nav.Link>
              </>
            )}
            </Nav>
            {props.auth.isAuthenticated ? (
            <Nav className="justify-content-end right-side-navbar">
              <Dropdown className="user-profile-dropdown d-none d-lg-block">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  <FaUser />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="1" href="/preferences">Preference</Dropdown.Item>
                  <Dropdown.Item eventKey="2" onClick={(e) => {
                      e.preventDefault();
                      props.logoutUser();
                    }}>
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          ) : (
            <Nav className="justify-content-end right-side-navbar d-none d-lg-flex">
                <Nav.Link className="nav-item" as={Link} to="/login">Login</Nav.Link>
                <Nav.Link className="nav-item" as={Link} to="/register">Register</Nav.Link>
            </Nav>
          )}
          </Navbar.Collapse>
      </Navbar>
    </>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(withRouter(NavBar));
