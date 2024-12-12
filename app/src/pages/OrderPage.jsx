import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { server } from "../main";

const OrderPage = () => {
  const [order, setOrder] = useState([]);
  const params = useParams();

  async function fetchOrder() {
    try {
      const { data } = await axios.get(`${server}/api/order/${params.id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setOrder(data.order);
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

          <Table>
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
                order.items.map((item, i) => {
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{item.product.title}</td>
                    <td>
                      <Link to={`/product/${item.product._id}`}>
                        <img
                          src={`${server}/${item.product.image}`}
                          alt={item.product.title}
                        />
                      </Link>
                    </td>
                  </tr>;
                })}
            </tbody>
          </Table>
        </Container>
      )}
    </>
  );
};

export default OrderPage;
