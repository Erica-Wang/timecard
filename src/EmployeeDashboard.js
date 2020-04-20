import React from 'react';
import './App.css';
import {Link} from 'react-router-dom';
import logo from './assets/logo.svg';
import {Navbar, Button} from 'react-bootstrap';
import Tasks from './Tasks';
import Timecard from './Timecard';

function EmployeeDashboard() {
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
        <Tasks />
      </div>
      
      {/* <Tasks />
      <Timecard />
      <Tasks />
      <Timecard />
      <Tasks />
      <Timecard /> */}

    </div>
  );
}

export default EmployeeDashboard;
