import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Button, Image, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { server } from "../main";

const ProductDetails = () => {
  const [product, setProduct] = useState([]);
  const params = useParams();

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
            <Button variant="secondary">Add to Cart</Button>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ProductDetails;
