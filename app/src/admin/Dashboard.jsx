import React from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ProductData } from "../context/ProductContext";
import Home from "./pages/Home";
import AllData from "./pages/AllData";
import Orders from "./pages/Orders";

const Dashboard = ({ user }) => {
  const navigate = useNavigate();
  if (user.role !== "admin") return navigate("/");
  const { adminProducts } = ProductData();

  return (
    <Container>
      <Tabs
        defaultActiveKey="home"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey={"home"} title={"Dashboard"}>
          <Home products={adminProducts} />
        </Tab>
        <Tab eventKey={"data"} title={"All Data"}>
          <AllData />
        </Tab>
        <Tab eventKey={"orders"} title={"Orders"}>
          <Orders />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Dashboard;