import PropTypes from "prop-types";
import { Button, Card, ListGroup } from "react-bootstrap";
import { server } from "../main";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  return (
    <Card style={{ width: "18rem", marginTop: "20px" }}>
      <Card.Img
        variant="top"
        src={`${server}/${product.image}`}
        style={{ height: "300px" }}
      />
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Title>{product.description}</Card.Title>
      </Card.Body>

      <ListGroup className="list-group-flush">
        <ListGroup.Item>Rs. {product.price}</ListGroup.Item>
      </ListGroup>

      <Card.Body>
        <Button onClick={() => navigate(`/product/${product._id}`)}>
          View Product
        </Button>
      </Card.Body>
    </Card>
  );
};

// Props validation
ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductCard;
