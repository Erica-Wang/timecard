import React from 'react';
import './App.css';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import ManagerDashboard from './ManagerDashboard';
import EmployeeDashbord from './EmployeeDashboard';
import Assign from './Assign';
import Validate from './Validate'
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
          <Route path="/register" exact component={Register}/>
          <Route path="/manager-dashboard" exact component={ManagerDashboard} />
          <Route path="/employee-dashboard" exact component={EmployeeDashbord} />
          <Route path="/manager-dashboard/assign-tasks" exact component={Assign} />
          <Route path="/manager-dashboard/validate-timesheets" exact component={Validate} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
