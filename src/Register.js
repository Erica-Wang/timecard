import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormCheck, DropdownButton, Dropdown } from "react-bootstrap";
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import './App.css';

function Register() {
  const [username, setUsername] = useState("");
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [workunit, setWorkunit] = useState("");
  const [department, setDepartment] = useState("");
  const [redir, setRedir] = useState();
  const [manager, setManager] = useState(false);
  var basePay = 0;

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

  function handleSubmit() {
    console.log("hello");

    if (manager) {
      axios.get('https://htc2020-timecard.herokuapp.com/managerlogin', {
        params: {
          id: userid,
          password: password,
        }
      })
        .then(res => {
          if (res.data.auth === 'true') {
            console.log(res);
            setRedir(<Redirect to={{ pathname: '/manager-dashboard', data: { userid: userid } }} />);
          } else {
            alert("Invalid user ID or password, please try again!");
          }
        }).catch((err) => {
          console.log(err);
        });
    } else {
      axios.get('https://htc2020-timecard.herokuapp.com/workerlogin', {
        params: {
          id: userid,
          password: password,
        }
      })
        .then(res => {
          if (res.data.auth === 'true') {
            console.log(res);
            setRedir(<Redirect to={{ pathname: '/employee-dashboard', data: { userid: userid } }} />);
          } else {
            alert("Invalid user ID or password, please try again!");
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
        </FormGroup>

        <FormGroup controlId="password" bsSize="large">
          Please enter a secure password.
        <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>

        <FormCheck
          type="switch"
          id="custom-switch"
          label="Check this if you're a manager"
          className="form-check"
          onClick={checkManager}
        />
        
        <DropdownButton 
          id="dropdown-basic-button" 
          title="What is your job status?" 
          className="dropdown-pay"
          disabled={isManager()}>
            <Dropdown.Item href="#/action-1">Full-time</Dropdown.Item>
            <Dropdown.Item>Student</Dropdown.Item>
            <Dropdown.Item>Casual</Dropdown.Item>
        </DropdownButton>

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

        <DropdownButton 
          id="dropdown-basic-button" 
          title="What is your base pay?" 
          className="dropdown-pay"
          disabled={isManager()}> 
            <Dropdown.Item href="#/action-1">1CUPE1</Dropdown.Item>
            <Dropdown.Item>1CUPE2</Dropdown.Item>
            <Dropdown.Item>1CUPE3</Dropdown.Item>
            <Dropdown.Item>2CASUA</Dropdown.Item>
            <Dropdown.Item>2STUDS</Dropdown.Item>
        </DropdownButton>

        <Button
          block
          bsSize="large"
          disabled={!validateForm()}
          onClick={() => handleSubmit()}
        >Register
        </Button>

      </form>
    </div>

  );
}

export default Register;
