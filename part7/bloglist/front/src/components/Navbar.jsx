
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Создаем стилизованные компоненты
const StyledNavbar = styled(Navbar)`
text-align: center;
`;

const StyledNavbarBrand = styled(Navbar.Brand)`
    text-decoration: none;
    color:black;
    font-size: 20px;
  padding: 20px;
`;

const StyledNavLink = styled(Nav.Link)`
 padding: 20px;
`;

const StyledNavbarText = styled(Navbar.Text)`
position: absolute;
    right: 15px;
    text-align: center;
`;

const AppNavbar = ({ user, handleLogout }) => {
    return (
        <StyledNavbar bg="light" expand="lg">
            <StyledNavbarBrand as={Link} to="/">Blog App</StyledNavbarBrand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <StyledNavLink as={Link} to="/blogs">Blogs</StyledNavLink>
                    <StyledNavLink as={Link} to="/users">Users</StyledNavLink>
                </Nav>
                {user && (
                    <StyledNavbarText>
                        Signed in as: {user.name} <Button variant="outline-secondary" onClick={handleLogout}>Logout</Button>
                    </StyledNavbarText>
                )}
            </Navbar.Collapse>
        </StyledNavbar>
    );
};

export default AppNavbar;