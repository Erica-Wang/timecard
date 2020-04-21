import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormCheck, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { Link } from 'react-router-dom';
import './App.css';

function Register() {
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return userid.length === 6 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
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

        <Link to='/employee-dashboard'>
          <Button block bsSize="large" disabled={!validateForm()} type="submit">create account</Button>
          {
              // you want to render in their userID
              // you want to create a button that says go back to Login
          }
        </Link>
      </form>
    </div>

  );
}

export default Register;
