import { CartData } from "../context/CartContext.jsx";
import { Button, Container, Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { server } from "../main";
import { RiSecurePaymentLine } from "react-icons/ri";
import toast from "react-hot-toast";
import Loader from "../components/Loader.jsx";

const Payment = () => {
  const { cart, subTotal, fetchCart } = CartData();
  const [address, setAddress] = useState([]);
  const [method, setMethod] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const params = useParams();

  async function fetchAddress() {
    try {
      const { data } = await axios.get(`${server}/api/address/${params.id}`, {
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

  const paymentCod = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${server}/api/order/new/cod`,
        { method, phone: address.phone, address: address.address },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        },
      );

      setLoading(false);
      toast.success(data.message);
      navigate("/ordersuccess");
      fetchCart();
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  const paymentOnline = () => {
    return (
      <>
        {loading ? (
          <Loader />
        ) : (
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
                  <Image
                    src={`${server}/${e.product.image}`}
                    alt=""
                    width={60}
                  />
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

            <select value={method} onChange={(e) => setMethod(e.target.value)}>
              <option>Choose Payment Method</option>
              <option value="cod">Cod</option>
              <option value="online">Online</option>
            </select>

            <br />
            <Button
              onCanPlay={method === "cod" ? paymentCod : paymentOnline}
              className="mt-2"
              onClick={() => navigate("/ordersuccess")}
            >
              Proceed <RiSecurePaymentLine />
            </Button>
          </Container>
        )}
      </>
    );
  };

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

      <select value={method} onChange={(e) => setMethod(e.target.value)}>
        <option>Choose Payment Method</option>
        <option value="cod">Cod</option>
        <option value="online">Online</option>
      </select>

      <br />
      <Button
        onClick={method === "cod" ? paymentCod : paymentOnline}
        className="mt-2"
      >
        Proceed <RiSecurePaymentLine />
      </Button>
    </Container>
  );
};

export default Payment;
