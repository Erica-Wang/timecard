import React, { useState, useEffect } from "react";
import './App.css';
import logo from './assets/logo.svg';
import {Navbar} from 'react-bootstrap';
import { Tasks, NoTasks } from './Tasks';
import axios from 'axios';

const EmployeeDashboard = (props) => {


  const [state, setState] = useState();
  const userid = props.location.state.userid;
  const getUserTasks = () => {
    console.log("i am getting tasks");
    axios.get('https://htc2020-timecard.herokuapp.com/employeeGetTasks', {
      params: {
        workerID: userid
      }
    })
    .then(response => {
      console.log("these are the tasks");
      console.log(response.data);
      var taskList = [];
      if (response.data.length == 0) {
        console.log("this dude has no tasks!");
      }
      for (const task of response.data) {
        console.log("I am iterating");
        console.log(task);
        taskList.push(<Tasks
          jobCode={task.jobCode} 
          activityCode={task.activityCode} 
          notes={task.notes} 
          managerAssigned={task.managerAssigned} />);
      }
      if (response.data.length == 0) {
        console.log("oof");
        taskList.push(<NoTasks />);
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

  
  return (
    <div>
      <Navbar bg="light">
        <Navbar.Brand>
          <img className="nav-logo" src={logo} alt="logo" />
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: {}
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