import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormCheck, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { Link } from 'react-router-dom';
import './App.css';

function Login() {
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

        {/*
        <FormCheck
          type="switch"
          id="custom-switch"
          label="Check this if you're a manager"
          className="form-check"
        />
        */}

        <Link to='/employee-dashboard'>
          <Button block bsSize="large" disabled={!validateForm()} type="submit">Login</Button>
        </Link>
      </form>
    </div>

  );
}

export default Login;
