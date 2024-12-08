import React from "react";
import { Button, Card } from "react-bootstrap";

const Accounts = ({ user }) => {
  return (
    <div
      style={{
        marginTop: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card style={{ width: "18rem" }}>
        {user && (
          <Card.Body>
            <Card.Title>{user.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {user.email}
            </Card.Subtitle>
            <Button>Your Orders</Button> <br />
            {user.role === "admin" && (
              <Button className="mt-4" variant="success">
                Dashboard
              </Button>
            )}
          </Card.Body>
        )}
      </Card>
    </div>
  );
};

export default Accounts;
