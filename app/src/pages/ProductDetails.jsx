import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Button, Image, Row, Col } from "react-bootstrap";
import { data, useParams } from "react-router-dom";
import { server } from "../main";
import { CartData } from "../context/CartContext";
import { UserData } from "../context/UserContext";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const [product, setProduct] = useState([]);
  const [stock, setStock] = useState("");
  const params = useParams();
  const { addToCart } = CartData();
  const { isAuth, user } = UserData();

  async function updateStock() {
    try {
      const { data } = await axios.put(
        `${server}/api/product/${params.id}`,
        { stock },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      toast.success(data.message);
      fetchProducts();
      setStock("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  async function fetchProducts() {
    try {
      const { data } = await axios.get(`${server}/api/product/${params.id}`);
      setProduct(data.product);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCartHandler = async (product) => {
    await addToCart(product);
  };

  return (
    <Container className="mt-4">
      {product && (
        <Row className="mt-5">
          <Col md={6}>
            <Image
              src={`${server}/${product.image}`}
              alt="product-image"
              fluid
            />
          </Col>
          <Col md={6}>
            <h2>{product.title} </h2>
            <p>{product.description}</p>
            <p>Category: {product.category}</p>
            <p>Price: Rs.{product.price}</p>
            {user.role === "admin" && <p>Stock: {product.stock}</p>}
            {user.role === "admin" && (
              <>
                <input
                  type="number"
                  placeholder="Update Stock"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  required
                />
                <Button className="mx-2" onClick={updateStock}>
                  Update Stock
                </Button>
              </>
            )}{" "}
            <br />
            {product.stock === 0 ? (
              <p className="text-danger">Out of Stock</p>
            ) : (
              <>
                {isAuth ? (
                  <Button
                    variant="secondary"
                    onClick={() => addToCartHandler(product._id)}
                  >
                    Add to Cart
                  </Button>
                ) : (
                  <p className="text-danger">
                    {" "}
                    Please login to add this item to your cart.
                  </p>
                )}
              </>
            )}
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ProductDetails;
