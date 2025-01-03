import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Button, Modal, Form, Alert } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faMapLocationDot,
  faPaw,
  faRightToBracket,
  faRss,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

/* interface NavbarProps{
  location: string;
} */

const NavBar: React.FC = () => {
  const [responseMessage, setResponseMessage] = useState({
    variant: "",
    message: "",
  }); // backend response
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [messageShow, setMessageShow] = useState(false); // show alert

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // TRY LOGIN
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
          body: JSON.stringify({
            username: username,
            password: password,
          }),
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
        setResponseMessage({
          variant: variant,
          message: data.message,
        });
        setMessageShow(true);
        return;
      }

      // RECARGAR PAGINA SI TODO FUNCIONA CORRECTAMENTE
      if (data.message === "success_login") {
        window.location.reload();
        return;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
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
            <Nav>
              <Nav.Link
                as={Link}
                to="/register"
                className={location.pathname === "/register" ? "active" : "" + "text-primary"}
                style={{textDecoration: "underline"}}
              >
                <FontAwesomeIcon icon={faUserPlus} /> Add your location!
              </Nav.Link>
              <Button variant="success" onClick={handleShow}>
                <FontAwesomeIcon icon={faRightToBracket} /> Login
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
