import React, {Component} from 'react';
import './App.css';
import Assignments from './Assignments';
import axios from 'axios';
import { Navbar } from 'react-bootstrap';
import logo from './assets/logo.svg';
import { Link } from 'react-router-dom';

class Assign extends Component{
  // const assignListTest = require('./assets/testAssignList.json')
  state = {
    assignList : []
  }
  async componentWillMount(){
    await axios.get('https://htc2020-timecard.herokuapp.com/managergettasks/')
        .then(response => {
          const managerDummy = "Anne K"
          var tempList = []
          for (const assign of response.data){
            tempList.push(<Assignments id={assign._id} jobCode={assign.jobCode} activityCode={assign.activityCode} managerAssigned={managerDummy} />)
          }
          this.setState({assignList: tempList});
          return response.data
        })
        .catch(error => {
          console.log(error);
        });
  }

render(){
  console.log(this.state.assignList);
  return (
    <div>
      <div className="nav-md">
    <Navbar bg="light">
      <Navbar.Brand>
        <img className="nav-logo" src={logo} alt="logo" />
      </Navbar.Brand>
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          Signed in as: {this.props.location.state.userid}
          <Link to='/'>
            <p style={{ textAlign: "right", padding: "none" }}>Log Out</p>
          </Link>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  </div>
  <h4 className="t-valid">Assign Tasks</h4>
      {this.state.assignList}
    </div>
  );
}
}


export default Assign;
