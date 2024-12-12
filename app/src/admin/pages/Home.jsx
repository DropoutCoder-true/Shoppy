import React, { useState } from "react";
import { Button, Container, Form, Modal, Row } from "react-bootstrap";
import ProductCard from "../../components/ProductCard";
import { ProductData } from "../../context/ProductContext";
import { server } from "../../main";
import toast from "react-hot-toast";
import axios from "axios";

const Home = ({ products }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };
  const { fetchProductAdmin } = ProductData();

  return (
    <Container>
      <h3>All Products</h3>
      <AddProduct
        handleClose={handleClose}
        show={show}
        setShow={setShow}
        fetchProductAdmin={fetchProductAdmin}
      />
      <Button onClick={handleShow}>Add Products +</Button>
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

const AddProduct = ({ handleClose, show, setShow, fetchProductAdmin }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [sold, setSold] = useState("");

  const categories = ["Fashion", "Technology", "Accessories"];

  const changeImageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  async function submitHandler(e) {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("stock", stock);
    myForm.append("price", price);
    myForm.append("category", category);
    myForm.append("image", image);
    myForm.append("sold", sold);

    try {
      const { data } = await axios.post(`${server}/api/product/new`, myForm, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      if (data.message) {
        toast.success(data.message);
        fetchProductAdmin();
        setShow(false);
        setTitle("");
        setDescription("");
        setStock("");
        setPrice("");
        setImage("");
        setCategory("");
        setSold("");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Products</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              required
            />
          </Form.Group>

          <input type="file" onChange={changeImageHandler} className="my-4" />

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              value={description}
              placeholder="Enter Description"
              minLength={10}
              maxLength={1000}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              value={price}
              placeholder="Enter Price"
              minLength={10}
              maxLength={10}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => {
                setStock(e.target.value);
              }}
              value={stock}
              placeholder="Enter Stock"
              minLength={10}
              maxLength={10}
              required
            />
          </Form.Group>

          <Form.Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Select Category</option>
            {categories.map((e) => (
              <option value={e} key={e}>
                {e}
              </option>
            ))}
          </Form.Select>

          <Form.Group className="mb-3 mt-3">
            <Form.Label>Sold</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => {
                setSold(e.target.value);
              }}
              value={sold}
              placeholder="Enter Sold Units"
              minLength={10}
              maxLength={10}
              required
            />
          </Form.Group>

          <Button className="my-4" type="submit">
            Add Product
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
