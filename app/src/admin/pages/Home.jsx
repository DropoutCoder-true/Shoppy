import React from "react";
import { Button, Container, Row } from "react-bootstrap";
import ProductCard from "../../components/ProductCard";

const Home = ({ products }) => {
  return (
    <Container>
      <h3>All Products</h3>
      <Button>Add Products +</Button>
      <Row className="justify-content-center" style={{ gap: "1rem" }}>
        {products &&
          products.map((i) => (
            <ProductCard key={i._id} admin={true} product={i} />
          ))}
      </Row>
    </Container>
  );
};

export default Home;
