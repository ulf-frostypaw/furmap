import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faMapLocationDot, faPaw, faQuestion, faRightToBracket, faRss } from '@fortawesome/free-solid-svg-icons'

function NavBar() {
  const handleFormActive = () => {
    alert("Click en el formulario")
  }
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand><Link to={import.meta.env.VITE_APP_URL + "/"}><img src={import.meta.env.VITE_APP_URL + "/images/marker.png"} width={22} /> Furmap</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features"><FontAwesomeIcon icon={faMapLocationDot} /> Map</Nav.Link> 
            <NavDropdown title={<span><FontAwesomeIcon icon={faInfoCircle} /> Info</span>} id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1"><FontAwesomeIcon icon={faPaw} /> About</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.1"><FontAwesomeIcon icon={faRss} /> Blog</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.1"><FontAwesomeIcon icon={faQuestion} /> FAQ</NavDropdown.Item>
            </NavDropdown>
            <Nav><Button variant="success" onClick={handleFormActive}><FontAwesomeIcon icon={faRightToBracket} /> Login</Button></Nav>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;