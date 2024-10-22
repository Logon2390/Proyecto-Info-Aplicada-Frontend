import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Dropdown, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import LoginIcon from "@mui/icons-material/Login";
import PersonIcon from "@mui/icons-material/Person";
import { useAuth } from "../auth/AuthContext";

function NavbarComponent() {
  const { user } = useAuth();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand className="navbar-brand">
          <Link className="dropdown-item" to="/">
            BlockChain
          </Link>
        </Navbar.Brand>

        {user ? (
          <Nav className="me-auto">
            <Nav.Link>
              <Link className="nav-link" to="/upload">
                Subir Archivos
              </Link>
            </Nav.Link>
          </Nav>
        ) : (
          <></>
        )}

        <Nav>
          {user ? (
            <Dropdown>
              <Dropdown.Toggle
                className="nav-link"
                id="basic-nav-dropdown"
                variant="#14d48c"
              >
                <PersonIcon style={{ marginRight: "5px" }} />
                {user.userName}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <NavDropdown.Item>
                  <Link className="dropdown-item" to="/view1">
                    Opcion 1
                  </Link>
                </NavDropdown.Item>

                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <Link className="dropdown-item" to="/" onClick={handleLogout}>
                    Cerrar sesión
                  </Link>
                </NavDropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Nav.Link>
              <Link className="nav-link" to="/login">
                <LoginIcon style={{ marginRight: "5px" }} />
                Iniciar sesión
              </Link>
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;