import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Button, Image, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { server } from "../main";
import { CartData } from "../context/CartContext";
import { UserData } from "../context/UserContext";

const ProductDetails = () => {
  const [product, setProduct] = useState([]);
  const params = useParams();
  const { addToCart } = CartData();
  const { isAuth } = UserData();

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
