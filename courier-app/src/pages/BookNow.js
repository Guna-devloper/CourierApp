// src/pages/BookNow.js
import React, { useState } from "react";
import { Container, Card, Button, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import "../styles/BookNow.css";

const BookNow = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const service = location.state?.service || {};

  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [weight, setWeight] = useState("");
  const [preference, setPreference] = useState("Standard");

  // Handle Booking Confirmation
  const handleConfirmBooking = async () => {
    if (!fromLocation || !toLocation || !weight) {
      alert("Please fill all the details!");
      return;
    }

    try {
      await addDoc(collection(db, "bookings"), {
        serviceTitle: service.title,
        serviceDescription: service.description,
        servicePrice: service.price,
        fromLocation,
        toLocation,
        weight,
        preference,
        timestamp: new Date()
      });

      alert("Booking Confirmed!");
      navigate("/home"); // Redirect after booking
    } catch (error) {
      console.error("Error adding booking: ", error);
      alert("Booking failed! Please try again.");
    }
  };

  return (
    <Container className="booknow-page">
      <Card className="booknow-card">
        <Card.Body>
          <h3 className="booknow-title">🚀 Booking Details</h3>
          <h4 className="service-name">{service.title}</h4>
          <p className="service-description">{service.description}</p>
          <p className="service-price">💰 {service.price}</p>

          {/* Input Fields */}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>📍 From</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter pickup location"
                value={fromLocation}
                onChange={(e) => setFromLocation(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>📍 To</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter destination"
                value={toLocation}
                onChange={(e) => setToLocation(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>⚖️ Weight (kg)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>🚚 Delivery Preference</Form.Label>
              <Form.Select value={preference} onChange={(e) => setPreference(e.target.value)}>
                <option value="Standard">Standard Delivery</option>
                <option value="Express">Express Delivery</option>
                <option value="Same-Day">Same-Day Delivery</option>
              </Form.Select>
            </Form.Group>
          </Form>

          {/* Buttons */}
          <Button variant="success" className="confirm-btn" onClick={handleConfirmBooking}>
            Confirm Booking
          </Button>
          <Button variant="secondary" className="back-btn" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default BookNow;
