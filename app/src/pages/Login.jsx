import { Container, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserData } from "../context/UserContext";
import { useState } from "react";

const Login = () => {
  const { userLogin } = UserData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    await userLogin(email, password);
  };

  return (
    <Container className="mt-4">
      <h4 className="mt-4">Login</h4>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button type="submit">Login</Button> <br />
        <Link to="/register">Don't have an account</Link>
      </Form>
    </Container>
  );
};

export default Login;
