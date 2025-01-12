import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Button, Modal, Form, Alert, Dropdown } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faInfoCircle,
  faMapLocationDot,
  faPaw,
  faPowerOff,
  faRightToBracket,
  faRss,
  faUser,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  user_token?: string;
  username?: string;
  user_picture?: string;
}

const NavBar: React.FC = () => {
  const isLogged = useContext(AuthContext);
  
  // @ts-expect-error: Token decoding may fail if the token is malformed or missing
  const decoded: DecodedToken | null = isLogged?.userDataLogged?.token ? jwtDecode<DecodedToken>(isLogged.userDataLogged.token) : null;

  const [responseMessage, setResponseMessage] = useState({
    variant: "",
    message: "",
  });
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [messageShow, setMessageShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Manejo del formulario de inicio de sesión
  const handleSubmitLoginForm = async () => {
    const usernameInput = document.getElementById(
      "username"
    ) as HTMLInputElement;
    const passwordInput = document.getElementById(
      "password"
    ) as HTMLInputElement;

    const username = usernameInput.value;
    const password = passwordInput.value;
    setResponseMessage({ variant: "", message: "" });
    setMessageShow(false);

    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + "/users/auth",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        let variant = "primary";
        if (data.message === "error_all_fields_required") {
          variant = "warning";
        } else if (
          data.message === "error_user_not_found" ||
          data.message === "error_invalid_credentials" ||
          data.message === "error_account_suspended"
        ) {
          variant = "danger";
        }
        setResponseMessage({ variant, message: data.message });
        setMessageShow(true);
        return;
      }

      if (data.message === "success_login") {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLogOut = async () => {
    
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/users/auth/logout', {
        method: 'POST',
        credentials: 'include',
      })

      if(response.ok){
        window.location.href = import.meta.env.VITE_APP_URL + '/'
      }

    } catch (error) {
      console.log("Error: " + error)
      
    }
    
  }
  return (
    <>
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
        className="furmapModal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Welcome back!</Modal.Title>
        </Modal.Header>
        {messageShow && (
          <Alert
            variant={responseMessage.variant}
            dismissible
            onClose={() => setMessageShow(false)}
          >
            <strong>{responseMessage.message}</strong>
          </Alert>
        )}
        <Modal.Body>
          <Form method="POST">
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username or e-mail</Form.Label>
              <Form.Control
                type="text"
                placeholder="@username"
                autoFocus
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password :3</Form.Label>
              <Form.Control type="password" required />
            </Form.Group>
          </Form>
          <Button
            variant="primary"
            className="w-100"
            onClick={handleSubmitLoginForm}
          >
            Save Changes
          </Button>
          <Form.Group className="mt-4">
            <p className="text-center">
              Don't have account? <Link to={"/register"}>Sign up here</Link>
            </p>
          </Form.Group>
        </Modal.Body>
      </Modal>
      {show && <div className="backdrop" />}

      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>
            <Link to={import.meta.env.VITE_APP_URL + "/map"} className="logo">
              <img
                src={import.meta.env.VITE_APP_URL + "/images/marker.png"}
                width={22}
              />{" "}
              Furmap
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                as={Link}
                to="/map"
                className={location.pathname === "/map" ? "active" : ""}
              >
                <FontAwesomeIcon icon={faMapLocationDot} /> Map
              </Nav.Link>
              <NavDropdown
                title={
                  <span>
                    <FontAwesomeIcon icon={faInfoCircle} /> Info
                  </span>
                }
                id="collapsible-nav-dropdown"
              >
                <NavDropdown.Item as={Link} to={"/about"}>
                  <FontAwesomeIcon icon={faPaw} /> About
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={"/blog"}>
                  <FontAwesomeIcon icon={faRss} /> Blog
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            {isLogged?.isAuthenticated === true ? (
              <NavDropdown
                title={
                  <span>
                    <img
                      src={
                        decoded?.user_picture
                          ? `${import.meta.env.VITE_API_URL}/storage/${decoded.user_picture}`
                          : `${import.meta.env.VITE_APP_URL}/d-user.png`
                      }
                      alt="user_picture"
                      style={{
                        maxWidth: "40px",
                        aspectRatio: "1/1",
                        borderRadius: "50%",
                      }}
                    />
                  </span>
                }
                id="collapsible-nav-dropdown"
                className="custom-dropdown"
              >
                <NavDropdown.Item
                  as={Link}
                  to={
                    import.meta.env.VITE_APP_URL +
                    "/profile/" +
                    (decoded?.username || decoded?.user_token || "")
                  }
                >
                  <FontAwesomeIcon icon={faUser} /> My profile
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link}
                  to={import.meta.env.VITE_APP_URL + "/settings"}
                >
                  <FontAwesomeIcon icon={faCog} /> Settings
                </NavDropdown.Item>
                <Dropdown.Divider />
                <NavDropdown.Item onClick={handleLogOut}>
                  <span className="text-danger">
                    <FontAwesomeIcon icon={faPowerOff} /> Logout
                  </span>
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              // Si no está autenticado, muestra el login y el enlace de registro
              <Nav>
                <Nav.Link
                  as={Link}
                  to="/register"
                  className={
                    location.pathname === "/register" ? "active" : "" + " text-primary"
                  }
                  style={{ textDecoration: "underline" }}
                >
                  <FontAwesomeIcon icon={faUserPlus} /> Add your location!
                </Nav.Link>
                <Button variant="success" onClick={handleShow}>
                  <FontAwesomeIcon icon={faRightToBracket} /> Login
                </Button>
              </Nav>
            )}

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
