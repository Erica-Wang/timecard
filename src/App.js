import React from 'react';
import './App.css';
import Home from './Home';
import Login from './Login';
import ManagerDashboard from './ManagerDashboard';
import EmployeeDashbord from './EmployeeDashboard';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/manager-dashboard" exact component={ManagerDashboard} />
          <Route path="/employee-dashboard" exact component={EmployeeDashbord} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
