import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormCheck, DropdownButton, Dropdown } from "react-bootstrap";
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import './App.css';

function Register() {
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [redir, setRedir] = useState();
  var manager = false;
  var basePay = 0;

  function validateForm() {
    return userid.length === 6 && password.length > 0;
  }

  function checkManager() {
    if (manager) {
      manager = false;
    } else {
      manager = true;
    }
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

        <FormGroup controlId="userid" bsSize="large">
          Full Name
        <FormControl
            autoFocus
            type="userid"
            value={userid}
            onChange={e => setUserid(e.target.value)}
          />
        </FormGroup>

        <FormGroup controlId="password" bsSize="large">
          Password
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

        <DropdownButton id="dropdown-basic-button" title="What is your base pay?" className="dropdown-pay">
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item>Another action</Dropdown.Item>
            <Dropdown.Item>Something else</Dropdown.Item>
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
