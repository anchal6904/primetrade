import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function AppNavbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));


  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          TaskManager
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {!token && (
              <>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Button
                  as={Link}
                  to="/signup"
                  variant="outline-light"
                  className="ms-3"
                >
                  Sign Up
                </Button>
              </>
            )}
            {token && (
              <div>
                <span style={{ color: "white", marginLeft:"20px"}}>{user.name}</span>
                {/* <Nav.Link as={Link} to="/">
                  Update
                </Nav.Link> */}
                <span style={{color:"white",marginLeft:"20px",cursor:"pointer"}} onClick={()=>navigate('/update-profile')}>Profile</span>
                <Button variant="outline-light" className="ms-3" onClick={handleLogout}>
                Logout
               </Button>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
