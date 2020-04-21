import React, {Component} from 'react';
import './App.css';
import {Form, Button} from 'react-bootstrap';
import axios from 'axios';


class Assigncard extends Component{
  state = {
    userList: []
  }

  async componentWillMount(){
    const tempList = []
    await axios.get('https://htc2020-timecard.herokuapp.com/getAllEmployees/')
    .then(response => {
      for (const user of response.data){
        tempList.push(<option >{user.name}</option>);
      }
      this.setState({userList: tempList});
      return response.data
    })
    .catch(error => {
      console.log(error);
    });
  }
  
  
  
  render() {
    return (
      <div className="timecard">
        <Form className="timecard-form">
          <Form.Group controlId="equimentNumber">
            <Form.Label>Worker Assigned</Form.Label>
            <Form.Control as="select">
                  {this.state.userList}
              </Form.Control>
          </Form.Group>
          <Form.Group controlId="hour">
            <Form.Label>Notes</Form.Label>
            <Form.Control type="" placeholder="Job Details" />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
        </Form>
      </div>
    );
  }
}


export default Assigncard;
