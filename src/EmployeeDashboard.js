import React, { useState, useEffect } from "react";
import logo from './assets/logo.svg';
import {Navbar, Container, Row, Col, Nav} from 'react-bootstrap';
import { Tasks, NoTasks } from './Tasks';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './App.css';
import JobMap from './JobMap';

const EmployeeDashboard = (props) => {
  const [userInfo, setUserInfo] = useState({Name: ""});
  const [employeeTasks, setTaskList] = useState([]);
  const userid = props.location.state.userid;
  const getUserInfo = () => {
    console.log("i am getting tasks");
    // get employee tasks
    axios.get('https://htc2020-timecard.herokuapp.com/employeeGetTasks', {
      params: {
        workerID: userid
      }
    })
    .then(response => {
      console.log("these are the tasks");
      console.log(response.data);
      var taskList = [];
      if (response.data.length === 0) {
        console.log("this dude has no tasks!");
      }
      for (const task of response.data) {
        console.log("I am iterating");
        console.log(task);
        taskList.push(<Tasks // push each of th tasks onto the tasklist
          jobCode={task.jobCode} 
          activityCode={task.activityCode} 
          notes={task.notes} 
          managerAssigned={task.managerAssigned}
          id={userid} />);
      }
      if (response.data.length === 0) { // if the employee has no tasks, render a component saying so
        console.log("oof");
        taskList.push(<NoTasks />);
      }
      setTaskList(taskList);
    })
    .catch(error => {
      console.log(error);
    });

    // get their user info

    axios.get('https://htc2020-timecard.herokuapp.com/getPersonInfo', {
      params: {
        id: userid
      }
    })
    .then(response => {
      setUserInfo(response.data);
      console.log("o");
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  }

  useEffect(() => {
    getUserInfo();
  }, []);


  return (
    <div>
      <Navbar bg="light">
        <Navbar.Brand>
          <img className="nav-logo" src={logo} alt="logo" />
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: {userInfo.name}
            <Link to='/'>
              <p style={{textAlign:"right", padding:"none"}}>Log Out</p>  
            </Link> 
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
      <Container>
        <Row className="search-cont">
          <Col className="title" sm={8}><h4>Employee Dashboard</h4></Col>
          <Col className="search" sm={4}>
            <Nav className="justify-content-end" activeKey="/home">
              <Nav.Item className="ed-bc">
              <Link to={{
                pathname: "/employee-dashboard",
                state: {
                  userid: props.location.state.userid
                }}}> Tasks </Link> 
              </Nav.Item>
              <Nav.Item className="ed-bc">
                <Link to={{
                pathname: "/employee-dashboard/job-map",
                state: {
                  userid: props.location.state.userid,
                  numTasks: employeeTasks.length
                }}}> Map </Link> 
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
      </Container>
      <div className="job">
        <Container>
          <Row>
            <Col md>
              {employeeTasks}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default EmployeeDashboard;