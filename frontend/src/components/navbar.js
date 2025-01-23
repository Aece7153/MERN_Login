import React, { useEffect, useState } from "react";
import getUserInfo from "../utilities/decodeJwt";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import ReactNavbar from "react-bootstrap/Navbar";

// Navbar Component
export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getUserInfo()); // Fetch and set user info on component mount
  }, []);

  return (
    <ReactNavbar bg="dark" variant="dark">
      <Container>
        {/* Left-Aligned Links */}
        <Nav>
          {/* Conditionally render Login button if user is not logged in */}
           
            <Nav.Link
              href="/"
              className="bg-secondary text-light rounded px-3 py-1 mx-1"
            >
              Login
            </Nav.Link>
            
          
          <Nav.Link
            href="/home"
            className="bg-secondary text-light rounded px-3 py-1 mx-1"
          >
            Home
          </Nav.Link>
        </Nav>

        {/* Right-Aligned Links */}
        <Nav className="ms-auto">
          <Nav.Link
            href="/swagger"
            className="bg-secondary text-light rounded px-3 py-1 mx-1"
          >
            Swagger
          </Nav.Link>
          <Nav.Link
            href="/mbtaAlerts"
            className="bg-secondary text-light rounded px-3 py-1 mx-1"
          >
            MBTA Alerts
          </Nav.Link>
          <Nav.Link
            href="/privateUserProfile"
            className="bg-secondary text-light rounded px-3 py-1 mx-1"
          >
            Profile
          </Nav.Link>
        </Nav>
      </Container>
    </ReactNavbar>
  );
}
