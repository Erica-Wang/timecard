import React from 'react';
import './App.css';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import logo from './assets/logo.svg';

function Home() {
  return (
    <div>
      <img src={logo} className="logo" alt="Logo" />
      <h1 className="subtitle">Operations Timecard Manager</h1>
      <Link to='/login'>
        <Button className="homeLogin">Login</Button>
      </Link>
    </div>
  );
}

export default Home;
