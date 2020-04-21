import React from 'react';
import './App.css';
import {Link} from 'react-router-dom';
import logo from './assets/logo.svg';
import {Navbar, Button, Container, Row, Col} from 'react-bootstrap';
import Tasks from './Tasks';
import Timecard from './Timecard';

function EmployeeDashboard() {
  
  const elements = ['hong yi', 'dan', 'tailai', 'erica', 'rahma'];
  const items = []

  for (const [index, value] of elements.entries()) {
    items.push(<Tasks jobCode={value} />)
  }
  
  return (
    <div>
      <Navbar bg="light">
        <Navbar.Brand>
          <img className="nav-logo" src={logo} alt="logo" />
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: NAME
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
      <h1>Employee Dashboard</h1>
      {/* EHEHHEHEHE renderin these boys is fun*/}
      
      <div className="job">
      <Container>
        <Row>
          <Col>
            <Tasks />
            <Tasks />
          </Col>
          <Col>
            <Tasks />
            <Tasks />
          </Col>
          <Col>
            <Tasks />
            <Tasks />
          </Col>
        </Row>
      </Container>
      {items}
      </div>
    </div>
  );
}

export default EmployeeDashboard;
