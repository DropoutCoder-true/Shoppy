import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";
import toast from "react-hot-toast";

const Header = () => {
  const navigate = useNavigate();
  const { isAuth, setUser, setIsAuth } = UserData();

  const logoutHandler = () => {
    localStorage.clear();
    setUser([]);
    setIsAuth(false);
    toast.success("Logged Out");
  };

  return (
    <Navbar
      bg="dark"
      data-bs-theme="dark"
      expand="lg"
      className="lg-body-tertiary"
    >
      <Container fluid>
        <Navbar.Brand>Shoppy</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link>
              <Link to="/">Home</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/product">Products</Link>
            </Nav.Link>
            {isAuth && (
              <Nav.Link>
                <Link to="/account">Account</Link>
              </Nav.Link>
            )}
          </Nav>

          {isAuth ? (
            <Button onClick={logoutHandler} variant="danger">
              Logout
            </Button>
          ) : (
            <Button onClick={() => navigate("/login")} variant="success">
              Login
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
