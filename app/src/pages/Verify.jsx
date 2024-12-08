import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const Verify = () => {
  return (
    <Container className="mt-4">
      <h4 className="mt-4">Verify</h4>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Enter OTP</Form.Label>
          <Form.Control type="number" placeholder="Enter OTP" required />
        </Form.Group>
        <Button type="submit">Verify</Button> <br />
        <Link to="/login">Go to Login Page</Link>
      </Form>
    </Container>
  );
};

export default Verify;
