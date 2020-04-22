import React, {useState, useEffect} from 'react';
import './App.css';
import {Form, Button} from 'react-bootstrap';
import axios from 'axios';
import {FaPlus} from 'react-icons/fa';
import Multiselect from "react-multi-select-component";



const Assigncard = (props) => {

  // clicked, <Premium />
  const [employees, setEmployees] = useState("");
  const [notes, setNotes] = useState("");
  const [users, setUsers] = useState("");


  const getUsers = () => {
    const tempList = []
    axios.get('https://htc2020-timecard.herokuapp.com/getAllEmployees/')
    .then(response => {
      for (const user of response.data){
        tempList.push({label: user.name, value : user.ID});
      }
      setUsers(tempList);
      return response.data
    })
    .catch(error => {
      console.log(error);
    });
  }

  useEffect(() => {
    getUsers();
  }, []);

  // updating state for employee tasks
  useEffect(() => {
    var state = {
      employees: employees,
      notes: notes,
      users: users
    };

    if (props.onChange) {
      console.log(state);
      props.onChange(state);
    }
  },
  [employees, notes, users]
  );

  return (
    <div className="timecard">
        <Form className="timecard-form">
          <Form.Group onChange={(e) => setNotes(e.target.value)} controlId="notes">
            <Form.Label>Notes</Form.Label>
            <Form.Control type="" placeholder="Job Details" />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
          <Multiselect className = "multi-select"
            options = {users}
            value={employees}
            onChange={setEmployees}
            labelledBy={"Select Employees"}
          />
          
        </Form>    
      </div>
  );
}

export default Assigncard;