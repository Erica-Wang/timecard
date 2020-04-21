import React from 'react';
import './App.css';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import logo from './assets/logo.svg';
// import bg from './assets/images/innisfilback.jpg';

function Home() {
  return (
    <div>
      <div className="background"></div>
      <div className="content">
        {/* <img src={bg} className="background" alt="bg" /> */}
        <img src={logo} className="logo" alt="Logo" />
        <p className="subtitle">Operations Timecard Manager</p>
        <Link to='/login'>
          <Button className="homeLogin">Login</Button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
