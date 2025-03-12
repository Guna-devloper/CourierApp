// src/pages/Courier.js
import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/Courier.css";

const services = [
  {
    title: "📦 Standard Delivery",
    description: "Reliable and affordable delivery within 3-5 business days.",
    price: "$5.99",
  },
  {
    title: "⚡ Express Delivery",
    description: "Get your package delivered within 24 hours.",
    price: "$12.99",
  },
  {
    title: "✈️ International Shipping",
    description: "Fast worldwide shipping with tracking.",
    price: "Varies by location",
  },
  {
    title: "🏠 Doorstep Pickup",
    description: "Schedule a pickup from your location.",
    price: "Free for premium users",
  },
];

const Courier = () => {
  const navigate = useNavigate();

  const handleBookNow = (service) => {
    navigate("/book-now", { state: { service } }); // Pass service details
  };

  return (
    <Container className="courier-page">
      <h2 className="page-title">📮 Courier Services</h2>
      <p className="page-subtitle">Choose the best delivery option for your needs.</p>

      <Row>
        {services.map((service, index) => (
          <Col md={6} lg={4} key={index} className="mb-4">
            <Card className="service-card">
              <Card.Body>
                <h4 className="service-title">{service.title}</h4>
                <p className="service-description">{service.description}</p>
                <p className="service-price">💰 {service.price}</p>
                <Button variant="primary" className="book-btn" onClick={() => handleBookNow(service)}>
                  Book Now
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Courier;
