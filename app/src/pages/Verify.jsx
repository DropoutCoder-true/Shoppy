import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";

const Verify = () => {
  const [otp, setOtp] = useState();
  const navigate = useNavigate();
  const { verifyUser } = UserData();

  const submitHandler = async (e) => {
    e.preventDefault();
    await verifyUser(Number(otp), navigate);
  };

  return (
    <Container className="mt-4">
      <h4 className="mt-4">Verify</h4>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Enter OTP</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </Form.Group>
        <Button type="submit">Verify</Button> <br />
        <Link to="/login">Go to Login Page</Link>
      </Form>
    </Container>
  );
};

export default Verify;
