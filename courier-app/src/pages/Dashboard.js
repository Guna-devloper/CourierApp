import React, { useEffect, useState } from "react";
import { Container, Card, Button, Table, Spinner, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { db } from "../firebaseConfig";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import "./Dashboard.css"; // Import updated CSS
import OrderHistory from "./OrderHistory";

const Dashboard = () => {
  const [bookings, setBookings] = useState([]); // Changed state name to 'bookings'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Query Firestore, ordering by timestamp (descending)
        const bookingsCollection = collection(db, "booking"); // Changed collection name to 'booking'
        const bookingsQuery = query(bookingsCollection, orderBy("timestamp", "desc"));
        const bookingSnapshot = await getDocs(bookingsQuery);

        if (!bookingSnapshot.empty) {
          // Map the booking data
          const bookingList = bookingSnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              status: data.status || "Pending", // Default status
              date: data.timestamp ? new Date(data.timestamp.toDate()).toLocaleString() : "N/A",
            };
          });

          setBookings(bookingList);
        } else {
          console.log("No bookings found in Firestore.");
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setError("Failed to fetch bookings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <Container className="dashboard-container">
      <h2 className="dashboard-header">📦 Welcome to Courier Dashboard</h2>

      {/* Booking Tracking Section */}
      <Card className="dashboard-card mb-4">
        <Card.Body>
          <h4>Track Your Bookings</h4>
          <p>Enter your booking ID to track your shipment.</p>
          <Link to="/track-booking">
            <Button variant="primary" className="dashboard-btn">Track Booking</Button>
          </Link>
        </Card.Body>
      </Card>

      {/* Bookings List */}
      <Card className="dashboard-card">
        <Card.Body>
          <h4>📜 Recent Bookings</h4>

          {error && <Alert variant="danger">{error}</Alert>}

          {loading ? (
            <div className="text-center mt-3">
              <Spinner animation="border" />
            </div>
          ) : (
         <OrderHistory />
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Dashboard;
