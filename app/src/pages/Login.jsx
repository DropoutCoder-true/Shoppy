import { Container, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <Container className="mt-4">
      <h4 className="mt-4">Login</h4>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="email" placeholder="enter email" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="enter password" required />
        </Form.Group>
        <Button type="submit">Login</Button> <br />
        <Link to="/register">Don't have an account</Link>
      </Form>
    </Container>
  );
};

export default Login;
