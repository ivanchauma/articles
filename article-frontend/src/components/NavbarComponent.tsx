import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { logout } from '../features/auth/authSlice';

const NavbarComponent: React.FC = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

    const { isAuthenticated } = useSelector(
      (state: RootState) => state.auth
    );

  // const { articles, userArticles, currentPage, totalPages, error } = useSelector(
  //   (state: RootState) => state.articles
  // );
    const handleLogout = () => {
      // Logic to handle logout goes here, e.g., clearing tokens, redirecting, etc.
      dispatch(logout());
      navigate('/login'); // Redirect to the home page if authenticated
    };

  return (
    <Navbar expand="lg" fixed="top" variant='dark' bg='dark' className="bg-light">
    <Container fluid>
      <Navbar.Brand href="#home">ReArticle</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
      {isAuthenticated &&(
            <>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/articles">Articles</Nav.Link>
        </Nav>
          <Nav className="ms-auto">
          <NavDropdown title="Profile" id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} to="/preferences">Preferences</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleLogout}>
              Logout
            </NavDropdown.Item>
          </NavDropdown>
          </Nav>
          </>
          )}
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
};

export default NavbarComponent;
