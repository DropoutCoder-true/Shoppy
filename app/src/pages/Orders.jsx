import axios from "axios";
import { Button, Container, Table } from "react-bootstrap";
import { server } from "../main";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  async function fetchOrders() {
    try {
      const { data } = await axios.get(`${server}/api/order/all`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setOrders(data.orders);
    } catch (error) {
      console.log(error.response.data.message);
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
                  <Button onClick={() => navigate(`/order/${item._id}`)}>
                    View
                  </Button>
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
