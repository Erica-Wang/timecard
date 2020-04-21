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
            <Link className="btn-link" to="/manager-dashboard/assign-tasks">
              <Button className="gen-btn" variant="success" type="submit"> 
                Assign Tasks
              </Button>
            </Link>
          </Col>
          <Col className="btn-divide">
             <Link className="btn-link" to="manager-dashboard/validate-timesheets">
              <Button className="gen-btn" variant="success" type="submit">
                  Validate Timesheets
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
} 

export default ManagerDashboard;
