import axios from "axios";
import { Button, Container, Table } from "react-bootstrap";
import { server } from "../main";
import { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  async function fetchOrders() {
    try {
      const { data } = await axios.get(`${server}/api/order/all`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setOrders(data.orders);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <Container>
      <h1>All Orders</h1>
      {orders && orders.length > 0 ? (
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Method</th>
              <th>Subtotal</th>
              <th>Status</th>
              <th>Action</th>
            </tr>

            {orders.map((item, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{item.method}</td>
                <td>{item.subTotal}</td>
                <td>{item.status}</td>
                <td>
                  <Button>View</Button>
                </td>
              </tr>
            ))}
          </thead>
        </Table>
      ) : (
        <p>No Orders Yet</p>
      )}
    </Container>
  );
};

export default Orders;
