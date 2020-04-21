import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormCheck, Form } from "react-bootstrap";
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
            setRedir(<Redirect to={{ pathname: '/manager-dashboard', state: { userid: userid } }} />);
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
            setRedir(<Redirect to={{ pathname: '/employee-dashboard', state: { userid: userid } }} />);
          } else {
            alert("Invalid user ID or password, please try again!");
          }
        }).catch((err) => {
          console.log(err);
        });

    }
  }

  return (
    <div>
      <div className="background"></div>
      <div className="Login content-form">
        {redir}
        <form >
          <h2 className="subtitle">Login</h2>

          <FormGroup controlId="userid">
            User ID
          <FormControl
              autoFocus
              type="userid"
              value={userid}
              onChange={e => setUserid(e.target.value)}
            />
          </FormGroup>

          <FormGroup controlId="password">
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
            className="l-btn"
            disabled={!validateForm()}
            onClick={() => handleSubmit()}
          >Login
          </Button>

          <FormGroup className="register-button">
            
            <Link to='/register'>
              <Button className="l-btn" block>Register</Button>
            </Link>
            <Form.Text className="btn-note">If you don't have an account, register here</Form.Text>
          </FormGroup>

        </form>
      </div>
    </div>

  );
}

export default Login;

// employee type: full-time, casual, or student
// 