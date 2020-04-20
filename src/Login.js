import React, { useState } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import { Link } from 'react-router-dom';
import './App.css';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <h2>General Login</h2>
        <h4>IDs will be associated with role type</h4>

        <FormGroup controlId="username" bsSize="large">
          User ID
        <FormControl
            autoFocus
            type="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
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
          <Button block bsSize="large" disabled={!validateForm()} type="submit">Login</Button>      
        </Link>
      </form>
    </div>

  );
}

export default Login;
