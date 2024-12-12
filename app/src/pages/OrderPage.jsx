import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { server } from "../main";

const OrderPage = () => {
  const [order, setOrder] = useState([]);
  const params = useParams();
  const navigate = useNavigate(); 

  async function fetchOrder() {
    try {
      const {data} = await axios.get(`${server}/api/order/${params.id}`, {
        headers: {
          token: localStorage.getItem("token")
        }
      })
      setOrder(data.order)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <>
      {order && (
        <Container className="text-center my-2 text-danger">
          <h3>OrderId - {order._id}</h3>
          <h4 className="text-center my-2 text-primary">Products</h4>

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Price</th>
                <th>Image</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items &&
                order.items.map((item, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{item.product.title}</td>
                    <td>{item.product.price}</td>
                    <td>
                      <Link to={`/product/${item.product._id}`}>
                        <img
                          src={`${server}/${item.product.image}`}
                          alt=""
                          width={60}
                        />
                      </Link>
                    </td>
                    <td>{item.quantity}</td>
                    <td>Rs. {item.product.price * item.quantity}</td>
                  </tr>
                ))}
            </tbody>
          </Table>

          <h5 className="text-center my-2 text-primary">SubTotal - Rs. {order.subTotal}</h5>
          <h5 className="text-center my-2 text-primary">Payment Method - {order.method}</h5>
          <h5 className="text-center my-2 text-primary">Status - {order.status}</h5>
          {order.paymentInfo && <h5 className="text-center my-2 text-primary">Payment ID - {order.paymentInfo}</h5>}
          <p className="text-center"><Button onClick={() => navigate("/orders")}>Go Back</Button></p>
        </Container>
      )}
    </>
  );
};

export default OrderPage;
