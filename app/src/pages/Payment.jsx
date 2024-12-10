import { CartData } from "../context/CartContext.jsx";
import { Container, Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { server } from "../main";

const Payment = () => {
  const { cart, subTotal, fetchCart } = CartData();
  const [address, setAddress] = useState(null);
  const [method, setMethod] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const params = useParams();

  async function fetchAddress() {
    try {
      const { data } = await axios.get(`${server}/address/${params.id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setAddress(data.address);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAddress();
  }, []);

  return (
    <Container>
      <h2>Proceed to Payment</h2>
      <h6>Products</h6>
      {cart &&
        cart.map((e, i) => (
          <div
            className="d-flex justify-content-center align-item-center"
            style={{ gap: "1rem" }}
            key={i}
          >
            <Image src={`${server}/${e.product.image}`} alt="" width={60} />
            <p>{e.product.name}</p>
            <p>Rs. {e.product.price}</p>
            <p>Quantity - {e.quantity}</p>
          </div>
        ))}

      <div className="mt-3">Total Price to be paid - Rs. {subTotal}</div>
      {address && (
        <div>
          <span>Address - {address.address}</span>
          <br />
          <span>Phone - {address.phone}</span>
        </div>
      )}
    </Container>
  );
};

export default Payment;
