// src/pages/OrderHistory.js
import React, { useEffect, useState } from "react";
import { Container, Table, Card, Spinner } from "react-bootstrap";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import "../styles/OrderHistory.css";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersCollection = collection(db, "bookings"); // Ensure collection name matches
        const orderSnapshot = await getDocs(ordersCollection);
        const orderList = orderSnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            status: data.status || "Pending", // Default status if not found
            date: data.timestamp ? new Date(data.timestamp.toDate()).toLocaleDateString() : "N/A",
          };
        });

        setOrders(orderList);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
      setLoading(false);
    };

    fetchOrders();
  }, []);

  return (
    <Container className="order-history">
      {loading ? (
        <div className="text-center mt-4">
          <Spinner animation="border" />
        </div>
      ) : (
        <Card className="order-card">
          <Card.Body>
            <Table striped bordered hover responsive className="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map((order, index) => (
                    <tr key={index}>
                      <td>{order.id}</td>
                      <td>
                        <span className={`status-${order.status.toLowerCase()}`}>
                          {order.status}
                        </span>
                      </td>
                      <td>{order.date}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center">No Orders Found</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default OrderHistory;
