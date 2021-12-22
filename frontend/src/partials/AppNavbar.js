import {Container, Nav, Navbar} from "react-bootstrap";

export default function AppNavbar(){
    return (
        <Navbar  bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">
                    Home
                </Navbar.Brand>
                <Nav className="ml-auto">
                    <Nav.Link href="/people">
                        People
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}