import React, { useState, useEffect } from "react";
import './App.css';
import logo from './assets/logo.svg';
import {Navbar} from 'react-bootstrap';
import Tasks from './Tasks';
import axios from 'axios';

const EmployeeDashboard = () => {
  const [state, setState] = useState();
  const userid = 'STE001';
  const getUserTasks = () => {
    console.log("i am getting tasks");
    axios.get('https://htc2020-timecard.herokuapp.com/employeeGetTasks', {
      params: {
        workerID: userid
      }
    })
    .then(response => {
      console.log(response.data);
      var taskList = [];
      console.log("I am iterating");
      for (const task of response.data) {
        console.log(task);
        taskList.push(<Tasks
          jobCode={task.jobCode} 
          activityCode={task.activityCode} 
          notes={task.notes} 
          managerAssigned={task.managerAssigned} />);
      }
      setState(taskList);
    })
    .catch(error => {
      console.log(error);
    });
  }
  useEffect(() => {
    getUserTasks();
  }, []);
  console.log("this is my list");
  console.log(state);
  
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
        {state}
      </div>
    </div>
  );
}

export default EmployeeDashboard;
