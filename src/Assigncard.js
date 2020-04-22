import React, {useState, useEffect} from 'react';
import './App.css';
import {Form, Button} from 'react-bootstrap';
import axios from 'axios';



const Assigncard = (props) => {

  // clicked, <Premium />
  const [employee, setEmployee] = useState("");
  const [notes, setNotes] = useState("");
  const [users, setUsers] = useState("");

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
          <Form.Group onChange={(e) => setEmployee(e.target.value)} controlId="employee">
            <Form.Label>Worker Assigned</Form.Label>
            <Form.Control as="select">
                  {users}
              </Form.Control>
          </Form.Group>
          <Form.Group onChange={(e) => setNotes(e.target.value)} controlId="notes">
            <Form.Label>Notes</Form.Label>
            <Form.Control type="" placeholder="Job Details" />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
        </Form>
      </div>
  );
}

export default Assigncard;


/*
class Assigncard extends Component{
  state = {
    userList: [],
    selected: "",
    notes: ""
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
          <Form.Group onChange={(e) => this.setState({selected: e.target.value})} controlId="employee">
            <Form.Label>Worker Assigned</Form.Label>
            <Form.Control as="select">
                  {this.state.userList}
              </Form.Control>
          </Form.Group>
          <Form.Group onChange={(e) => this.setState({notes: e.target.value})} controlId="notes">
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
*/