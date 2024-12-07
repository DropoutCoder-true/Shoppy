import { Badge, Container, Row } from "react-bootstrap";
import Slider from "../components/Slider";
import { ProductData } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const {topProducts, loading} = ProductData(); 
  return (
    <div>
      <Slider />
      <Container className="mt-4">
        <h4>
          Our Products <Badge bg="secondary">Top Selling</Badge>
        </h4>

        <Row className="justify-content-center" style={{gap: "1rem"}}>
          {
            topProducts && topProducts.length > 0 ? (topProducts.map((e) => <ProductCard key={e._id} product={e}/>)) : (<p>No Products Yet.</p>)
          }          
        </Row>
      </Container>
    </div>
  );
};

export default Home;
