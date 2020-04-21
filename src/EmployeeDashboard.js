import React from 'react';
import './App.css';
import logo from './assets/logo.svg';
import {Navbar, Button, Container, Row, Col} from 'react-bootstrap';
import Tasks from './Tasks';
import axios from 'axios';

const taskListTest = require('./assets/testTaskList.json')

function EmployeeDashboard() {

  const userid = 'STE001';
  function getUserTasks() {
    axios.get('http://localhost:5000/employeeGetTasks/', {
      params: {
        workerID: userid
      }
    })
    .then(response => {
      return response.data
    })
    .catch(error => {
      console.log(error);
    });
  }

  const taskList = []
 
  for (const task of taskListTest) {
    console.log(task);
    taskList.push(<Tasks 
      jobCode={task.jobCode} 
      activityCode={task.activityCode} 
      notes={task.notes} 
      managerAssigned={task.managerAssigned} />)
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
        {taskList}
      </div>
    </div>
  );
}

export default EmployeeDashboard;
