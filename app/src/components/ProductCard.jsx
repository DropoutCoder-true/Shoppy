import PropTypes from "prop-types";
import { Button, Card, ListGroup } from "react-bootstrap";
import { server } from "../main";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { ProductData } from "../context/ProductContext";

const ProductCard = ({ product, admin }) => {
  const navigate = useNavigate();
  const { fetchProductAdmin } = ProductData();

  const deleteHandler = async () => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        const { data } = await axios.delete(
          `${server}/api/product/${product._id}`,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        toast.success(data.message);
        fetchProductAdmin();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

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
        {admin && (
          <Button onClick={deleteHandler} className="mx-2" variant="danger">
            Delete
          </Button>
        )}
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
