import React from 'react';
import './App.css';
import {Link, Route} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

function ManagerDashboard() {
  return (
    <div class="dashboard">
      <h1>Manager Dashboard</h1>
      <hr></hr>
      <h4>Manager Options</h4>
      <Container>
        <Row>
          <Col className="btn-divide">
            <Button className="gen-btn" variant="success" type="submit">
              <Link className="btn-link" to="/">Manage Today's Tasks </Link>
            </Button>
          </Col>
          <Col className="btn-divide">
            <Button className="gen-btn" variant="success" type="submit">
                <Link className="btn-link" to="/">View Employee Progress</Link>
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
} 

export default ManagerDashboard;
