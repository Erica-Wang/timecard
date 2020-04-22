import React, {Component} from 'react';
import './App.css';
import Assignments from './Assignments';
import axios from 'axios';

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
      <h1>Assign Tasks</h1>
      {this.state.assignList}
    </div>
  );
}
}


export default Assign;
