import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormCheck } from "react-bootstrap";
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import './App.css';

function Login() {
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [redir, setRedir] = useState();
  var manager = false;

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
            setRedir(<Redirect to='/employee-dashboard' />);
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
        <h2>General Login</h2>
        <h4>IDs will be associated with role type</h4>

        <FormGroup controlId="userid" bsSize="large">
          User ID
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

        <Button
          block
          bsSize="large"
          disabled={!validateForm()}
          onClick={() => handleSubmit()}
        >Login
        </Button>

        <FormGroup bsSize="large" className="register-button">
          If you don't have an account, register here:
        <Link to='/register'>
            <Button block bsSize="large">Register</Button>
          </Link>
        </FormGroup>

      </form>
    </div>

  );
}

export default Login;
