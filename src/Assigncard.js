import React, {useState, useEffect} from 'react';
import './App.css';
import {Form, Button} from 'react-bootstrap';
import axios from 'axios';
import {FaPlus} from 'react-icons/fa';




const Assigncard = (props) => {

  // clicked, <Premium />
  const [info, setInfo] = useState("");
  const [employee, setEmployee] = useState("");
  const [notes, setNotes] = useState("");
  const [users, setUsers] = useState("");

  const options = [
    {label: "One", value: 1},
    {label: "Two", value: 2},
    {label: "Three", value: 3},
  ];

  const getUsers = () => {
    const tempList = []
    axios.get('https://htc2020-timecard.herokuapp.com/getAllEmployees/')
    .then(response => {
      for (const user of response.data){
        tempList.push(<option >{user.name}</option>);
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
      employee: employee,
      notes: notes,
      users: users
    };

    if (props.onChange) {
      console.log(state);
      props.onChange(state);
    }
  },
  [employee, notes]
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
            value={employee}
            onChange={setEmployee}
            labelledBy={"Select"}
          />
          
        </Form>
        <Multiselect
          options = {users}
          value={employee}
          onChange={setEmployee}
          labelledBy={"Select"}
        />
        
      </div>
  );
}

export default Assigncard;