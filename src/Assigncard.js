import React from 'react';
import './App.css';
import {Form, Button} from 'react-bootstrap';

const userListTest = require('./assets/testUserList.json')
const userList = []
for (const user of userListTest){
  userList.push(<option >{user.name}</option>);
}


function Assigncard() {
  return (
    <div className="timecard">
      <Form className="timecard-form">
        <Form.Group controlId="equimentNumber">
          <Form.Label>Worker Assigned</Form.Label>
          <Form.Control as="select">
                {userList}
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

export default Assigncard;
