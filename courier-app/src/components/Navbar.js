// src/components/NavbarComponent.js
import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Import CSS

const Navbar1 = () => {
  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/" className="navbar-brand">
          📦 Courier Service
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/dashboard">🏠 Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/track-order">📍 Track Order</Nav.Link>
            <Nav.Link as={Link} to="/order-history">📜 Order History</Nav.Link>
            <Nav.Link as={Link} to="/home">📜 Courier</Nav.Link>
            <Nav.Link as={Link} to="/">🔓 Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbar1;
