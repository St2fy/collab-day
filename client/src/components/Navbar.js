import { Container, Nav, Navbar } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap'
function Navigation() {
    return (
        <>
            <Navbar bg='dark' data-bs-theme='dark'>
                <Container>
                    <Navbar.Brand>Collab-Day</Navbar.Brand>
                    <Nav>
                        <LinkContainer to="/">
                            <Nav.Link href="home">Home</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/doc">
                            <Nav.Link href="Documentation">Documentation</Nav.Link>
                        </LinkContainer>
                    </Nav>
                    <Outlet/>
                </Container>
            </Navbar>
            
        </>
    )
}
export default Navigation;