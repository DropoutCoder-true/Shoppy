import { Badge, Container, Form, Row } from "react-bootstrap";
import { ProductData } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";

const Products = () => {
  const {
    products,
    loading,
    categories,
    search,
    setSearch,
    price,
    setPrice,
    page,
    setPage,
    category,
    setCategory,
  } = ProductData();

  return (
    <Container className="mt-4">
      <h4>
        Our Products <Badge bg="secondary"> All Products </Badge>
      </h4>

      <div
        className="filter"
        style={{
          width: "280px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
        }}
      >
        <h2>Filters</h2>
        <Form.Control
          type="text"
          placeholder="Search"
          style={{ width: "250px" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Form.Select
          aria-label="Default select example"
          className="mt-3"
          style={{ width: "250px" }}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Category</option>

          {categories &&
            categories.map((category, i) => (
              <option value={category} key={i}>
                {category}
              </option>
            ))}
        </Form.Select>

        <div className="range">
          <Form.Range
            className="mt-3"
            style={{ width: "200px" }}
            min={0}
            max={7000}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <p>Minimum Price - Rs. {price}</p>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <Row className="justify-content-center" style={{ gap: "1rem" }}>
          {products && products.length > 0 ? (
            products.map((e) => <ProductCard key={e._id} product={e} />)
          ) : (
            <p>No Products Yet</p>
          )}
        </Row>
      )}
    </Container>
  );
};

export default Products;
