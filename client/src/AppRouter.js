import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AddScreen from "./AddScreen";
import HomeScreen from "./HomeScreen";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'


function AppRouter() {
  return (
    <Container>
      <Navbar expand="lg" variant="light" bg="light">
        <Navbar.Brand href="?">No-Waste</Navbar.Brand>
      </Navbar>


      <Nav justify variant="tabs" defaultActiveKey="/">
        <Nav.Item>
          <Nav.Link href="/">Product List</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/AddScreen/">Add Product</Nav.Link>
        </Nav.Item>
      </Nav>

      <Router>
        <Route path="/" exact component={HomeScreen} />
        <Route path="/AddScreen/" component={AddScreen} />
      </Router>

    </Container>
  );
}

export default AppRouter;