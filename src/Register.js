import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormCheck, Form, DropdownButton, Dropdown } from "react-bootstrap";
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import './App.css';

function Register() {
  const [username, setUsername] = useState("");
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [workunit, setWorkunit] = useState("");
  const [department, setDepartment] = useState("");
  const [manager, setManager] = useState(false);
  const [status, setStatus] = useState("Full-time");
  const [pay, setPay] = useState("1CUPE1");
  const [redir, setRedir] = useState();

  function validateForm() {
    return userid.length === 6 && password.length > 0;
  }

  function isManager() {
    return manager;
  }

  function checkManager() {
    if (manager) {
        setManager(false);
    } else {
        setManager(true);
    }
    console.log(manager);
  }

  function handleRegister() {
    console.log("hello");

    // check if the work(user) ID is already taken, if it is, ping them an alert
    // else, continue
    console.log(manager);
    
    if (manager) {
      axios.post('https://htc2020-timecard.herokuapp.com/managerregister', {
        params: {
          id: userid,
          name: username,
          password: password,
        }
      })
        .then(res => {
          if (res.data.auth === 'true') {
            console.log(res);
            setRedir(<Redirect to={{ pathname: '/manager-dashboard', data: { userid: userid } }} />);
          } else {
            alert("There has been an error, please try again");
          }
        }).catch((err) => {
          console.log(err);
        });
    } else {
      axios.post('https://htc2020-timecard.herokuapp.com/workerregister', {
        params: {
          id: userid,
          name: username,
          password: password,
          timecode: pay,
          employeeType: status,
          workUnit: workunit,
          department: department
        }
      })
        .then(res => {
          if (res.data.auth === 'true') {
            console.log(res);
            setRedir(<Redirect to={{ pathname: '/employee-dashboard', data: { userid: userid } }} />);
          } else {
            alert("There has been an error, please try again");
          }
        }).catch((err) => {
          console.log(err);
        });

    }
  }

  return (
    <div className="Login">
      {redir}
      <form >
        <h2>New User Registration</h2>
        <h4>Enter in your registration information</h4>

        <FormGroup controlId="username" bsSize="large">
          What is your full name?
        <FormControl
            autoFocus
            type="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </FormGroup>

        <FormGroup controlId="userid" bsSize="large">
          What is your work (user) ID?
        <FormControl
            autoFocus
            type="userid"
            value={userid}
            onChange={e => setUserid(e.target.value)}
          />
        <Form.Text className="text-muted">
            Please enter (in all caps) the first 3 letters of your first name, followed by 3 digits.
        </Form.Text>
        </FormGroup>
        

        <FormGroup controlId="password" bsSize="large">
          Please enter a secure password.
        <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        <Form.Text className="text-muted">
            Please do not share your password with anyone else.
        </Form.Text>
        </FormGroup>

        <FormCheck
          type="switch"
          id="custom-switch"
          label="Check this if you're a manager"
          className="form-check"
          onClick={checkManager}
        />
        
        <Form.Group 
          onChange={(e) => setStatus(e.target.value)} 
          title="What is your job status?">
          <Form.Label>What is your job status?</Form.Label>
              <Form.Control 
                as="select" 
                custom
                disabled={isManager()}>
              <option>Full-time</option>
              <option>Student</option>
              <option>Casual</option>
          </Form.Control>
      </Form.Group>

{/*}
        <DropdownButton 
          id="dropdown-basic-button" 
          title="What is your job status?" 
          className="dropdown-pay"
          disabled={isManager()}
          onSelect={function(evt){selectStatus(evt)}}>
            <Dropdown.Item eventKey='Full-Time'>Full-time</Dropdown.Item>
            <Dropdown.Item eventKey='Student'>Student</Dropdown.Item>
            <Dropdown.Item eventKey='Casual'>Casual</Dropdown.Item>
        </DropdownButton>
  */}

        <FormGroup controlId="workunit" bsSize="large">
          What is your work unit?
        <FormControl
            autoFocus
            type="workunit"
            value={workunit}
            disabled={isManager()}
            onChange={e => setWorkunit(e.target.value)}
          />
        </FormGroup>

        <FormGroup 
          controlId="department" 
          bsSize="large">
          What is your department?
        <FormControl
            autoFocus
            type="department"
            value={department}
            disabled={isManager()}
            onChange={e => setDepartment(e.target.value)}
          />
        </FormGroup>

        <Form.Group 
          onChange={(e) => setPay(e.target.value)} 
          title="What is your base pay?">
          <Form.Label>What is your base pay?</Form.Label>
              <Form.Control 
                as="select" 
                custom
                disabled={isManager()}>
              <option>1CUPE1</option>
              <option>1CUPE2</option>
              <option>1CUPE3</option>
              <option>2CASUA</option>
              <option>2STUDS</option>
          </Form.Control>
      </Form.Group>

{/*
        <DropdownButton 
          id="dropdown-basic-button" 
          title="What is your base pay?" 
          className="dropdown-pay"
          disabled={!isManager()}> 
            <Dropdown.Item href="#/action-1">1CUPE1</Dropdown.Item>
            <Dropdown.Item >1CUPE2</Dropdown.Item>
            <Dropdown.Item >1CUPE3</Dropdown.Item>
            <Dropdown.Item >2CASUA</Dropdown.Item>
            <Dropdown.Item >2STUDS</Dropdown.Item>
        </DropdownButton>
*/}

        <Button
          block
          bsSize="large"
          disabled={!validateForm()}
          onClick={() => handleRegister()}
        >Register
        </Button>

      </form>
    </div>

  );
}

export default Register;