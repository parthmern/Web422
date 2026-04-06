import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Link from "next/link";
import { readToken, removeToken } from "@/lib/authenticate";
import { useRouter } from "next/router";

export default function MainNav() {
  const router = useRouter();
  let token = readToken();

  function logout() {
    removeToken();
    router.push("/");
  }

  return (
    <>
      <Navbar className="fixed-top navbar-dark bg-dark" expand="lg">
        <Container>
          <Navbar.Brand>
            <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
              Parth Ranjitbhai Patel {token && <>- Welcome {token.userName}</>}
            </Link>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="main-navbar-nav" />
          <Navbar.Collapse id="main-navbar-nav">
            <Nav className="me-auto">
              {/* <Nav.Link as={Link} href="/">
                Books
              </Nav.Link> */}
              <Nav.Link as={Link} href="/about">
                About
              </Nav.Link>
              {token && (
                <Nav.Link as={Link} href="/favourites">
                  Favourites
                </Nav.Link>
              )}
            </Nav>
            <Nav className="ms-auto">
              {!token && (
                <Nav.Link as={Link} href="/login">
                  Login
                </Nav.Link>
              )}
              {!token && (
                <Nav.Link as={Link} href="/register">
                  Register
                </Nav.Link>
              )}
              {token && <Nav.Link onClick={logout}>Logout</Nav.Link>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <br />
      <br />
    </>
  );
}
