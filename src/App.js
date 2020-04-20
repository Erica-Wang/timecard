import React from 'react';
import './App.css';
import Home from './Home';
import Login from './Login';
import ManagerDashboard from './ManagerDashboard';
import EmployeeDashbord from './EmployeeDashboard';
import Tasks from './Tasks';
import Timecard from './Timecard';
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
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
          <Route path="/tasks" exact component={Tasks} />
          <Route path="/timecard" exact component={Timecard} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
