import React from 'react';
import './App.css';
import {Link} from 'react-router-dom';

function Login() {
  return (
    <div>
      <h1>General Login</h1>
      <h3>IDs will be associated with role type</h3>
      <Link to='/employee-dashboard'> 
      {/* Change the value of to depending on type of account*/}
        <h2>Login</h2>
      </Link>
    </div>
  );
}

export default Login;
