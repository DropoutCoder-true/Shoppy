import React from "react";
import { Container, Table, Button } from "react-bootstrap";
import { CartData } from "../context/CartContext";
import { server } from "../main";
import { Link, useNavigate } from "react-router-dom";
import { IoBagCheckOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

const Cart = () => {
  const { cart, subTotal, updateCart, removeFromCart } = CartData();
  const navigate = useNavigate();

  const updateCartHandler = async (action, id) => {
    await updateCart(action, id);
  };

  return (
    <Container>
      <h2 className="mt-4 mb-3">Shopping Cart</h2>
      {cart && cart.length > 0 ? (
        <div>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Price</th>
                <th>Image</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {cart.map((e, i) => (
                <tr key={i}>
                  <th>{i + 1}</th>
                  <th>{e.product.title}</th>
                  <th>{e.product.price}</th>
                  <td>
                    <Link to={`/product/${e.product._id}`}>
                      <img
                        src={`${server}/${e.product.image}`}
                        alt="product-image"
                        style={{ width: "60px" }}
                      />
                    </Link>
                  </td>
                  <td>
                    <Button
                      className="mx-2"
                      onClick={() => updateCartHandler("dec", e._id)}
                    >
                      -
                    </Button>
                    {e.quantity}
                    <Button
                      className="mx-2"
                      onClick={() => updateCartHandler("inc", e._id)}
                    >
                      +
                    </Button>
                  </td>
                  <td>Rs. {e.product.price * e.quantity}</td>
                  <td>
                    <Button
                      variant="danger"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      onClick={() => removeFromCart(e._id)}
                    >
                      <MdDelete />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <p>No Items in Cart</p>
      )}

      <div className="bottom">
        <h2>SubTotal</h2>
        <p>Total Price: Rs. {subTotal}</p>
        <Button
          onClick={() => navigate("/checkout")}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "5px",
          }}
        >
          Checkout <IoBagCheckOutline />
        </Button>
      </div>
    </Container>
  );
};

export default Cart;
