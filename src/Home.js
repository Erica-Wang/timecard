import React from 'react';
import './App.css';
import {Link} from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <Link to='/login'>
        <h2>Login</h2>
      </Link>
    </div>
  );
}

export default Home;
