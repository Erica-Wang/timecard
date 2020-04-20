import React from 'react';
import './App.css';
import {Link} from 'react-router-dom';

function EmployeeDashboard() {
  return (
    <div>
      <h1>Employee Dashboard</h1>
      <Link to="tasks">
        <h2>Tasks</h2>
      </Link>
      <Link to="timecard">
        <h2>Timecard</h2>
      </Link>
    </div>
  );
}

export default EmployeeDashboard;
