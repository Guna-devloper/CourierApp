// src/pages/TrackOrder.js
import React, { useState } from "react";
import { Container, Form, Button, Card, Spinner, Alert, ProgressBar } from "react-bootstrap";
import { db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import "../styles/TrackOrder.css";

const TrackOrder = () => {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTrackOrder = async () => {
    if (!orderId.trim()) {
      setError("Please enter a valid Order ID.");
      return;
    }

    setLoading(true);
    setError("");
    setOrder(null);

    try {
      const orderRef = doc(db, "orders", orderId.trim());
      const orderSnapshot = await getDoc(orderRef);

      if (orderSnapshot.exists()) {
        const orderData = orderSnapshot.data();

        // Simulated Order Tracking Statuses
        let trackingSteps = [
          "Order Placed ✅",
          "Order Confirmed ✅",
          "Order Dispatched 🚚",
          "Out for Delivery 🏠",
          "Delivered ✅",
        ];

        // Ensure correct status checking (Convert Firestore status to match our predefined steps)
        let currentStatus = orderData.status.toLowerCase();
        let matchingStep = trackingSteps.find(step => step.toLowerCase().includes(currentStatus));

        // Find index of the current order status
        let trackingIndex = trackingSteps.indexOf(matchingStep);
        
        // If status doesn't match, default to first step
        if (trackingIndex === -1) trackingIndex = 0;

        let progress = ((trackingIndex + 1) / trackingSteps.length) * 100;

        setOrder({
          ...orderData,
          trackingSteps,
          trackingIndex,
          progress,
        });
      } else {
        setError("Order not found! Please check your Order ID.");
      }
    } catch (error) {
      console.error("Error fetching order:", error);
      setError("Error fetching order details.");
    }

    setLoading(false);
  };

  return (
    <Container className="track-order">
      <h2 className="page-title">📍 Track Your Order</h2>
      <Card className="track-card">
        <Card.Body>
          <Form>
            <Form.Group controlId="orderId">
              <Form.Label>Enter Order ID:</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., 12345ABC"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" className="track-btn mt-2" onClick={handleTrackOrder}>
              Track Order
            </Button>
          </Form>

          {loading && (
            <div className="text-center mt-3">
              <Spinner animation="border" />
            </div>
          )}

          {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

          {order && (
            <Card className="order-details mt-3">
              <Card.Body>
                <h4>📦 Order Details</h4>
                <p><strong>Order ID:</strong> {orderId}</p>
                <p><strong>Status:</strong> {order.trackingSteps[order.trackingIndex]}</p>
                <p><strong>Date:</strong> {order.date}</p>

                {/* Progress Bar */}
                <ProgressBar now={order.progress} label={`${order.progress}%`} className="mt-3" />

                {/* Tracking Steps */}
                <div className="tracking-steps mt-3">
                  {order.trackingSteps.map((step, index) => (
                    <p key={index} className={`tracking-step ${index <= order.trackingIndex ? "completed" : ""}`}>
                      {step}
                    </p>
                  ))}
                </div>
              </Card.Body>
            </Card>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default TrackOrder;
