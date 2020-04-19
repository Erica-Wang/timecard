import React from 'react';
import './App.css';
import Home from './Home';
import ManagerLogin from './ManagerLogin';
import EmployeeLogin from './EmployeeLogin';
import ManagerDashboard from './ManagerDashboard';
import EmployeeDashbord from './EmployeeDashboard';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/manager-login" exact component={ManagerLogin}/>
          <Route path="/employee-login" exact component={EmployeeLogin} />
          <Route path="/manager-dashboard" exact component={ManagerDashboard} />
          <Route path="/employee-dashboard" exact component={EmployeeDashbord} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
