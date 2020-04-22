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

  function addWorker() {
    console.log("adding the bitch");
    const eventHandlerWorker = data => {
      setEmployee(data);
      console.log('this is my premium data');
      console.log(data);
      console.log(employee);
    }
  setInfo([true, <Form.Group><Form.Label>Worker Assigned</Form.Label><Form.Control as="select" onChange={eventHandlerWorker}> {users}</Form.Control><Button onClick={addWorker}><FaPlus />&nbsp;Add Extra Worker</Button>{info[1]}</Form.Group>]);
    console.log(info);
  }

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
          <Form.Group onChange={(e) => setEmployee(e.target.value)} controlId="employee">
            <Form.Label>Worker Assigned</Form.Label>
            <Form.Control as="select">
                  {users}
              </Form.Control>
            <Button onClick={addWorker}>
            <FaPlus />
            &nbsp;Add Extra Worker
            </Button>
            {info[1]}
          </Form.Group>
          
        </Form>
      </div>
  );
}

export default Assigncard;