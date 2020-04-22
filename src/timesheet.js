import React, {useState, useEffect} from 'react';
import './App.css';
import {Button, Col, Container, Row} from 'react-bootstrap';
import axios from 'axios';
import { black } from 'material-ui/styles/colors';

const TimeSheetTask = (props) => {

  const [isValidated, validate] = useState(false);
  const [taskIsInvalid, invalidateTask] = useState(false);
  var premiums = [];
  for(var prem in props.task.premiums){
    premiums.push(prem+": "+props.task.premiums[prem]);
  }
  const prems = premiums.map(function(item){
    return <li>{item}</li>
  }); 
  console.log(props)
  return (
    <div classname="timesheet-validate">
      <Container>
        <Row>
          <Col sm>
            <p className="task-att">Job: {props.task.jobCode}</p>
            <p className="task-att">Activity: {props.task.activityCode} </p>
            <p className="task-att">Rate: {props.task.rate}</p>
            <p className="task-att">Hours Worked: {props.task.hrs}</p>
            <p className="task-att">Equipment: {props.task.equipment}</p>
          </Col>
          <Col sm>
            <p className="task-att">Premiums: {premiums.length}</p>
            <ul>
              {prems}
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

//props:
//_id
//id
//date
//
//
//

const TimeSheet = (props) => {

  const unvalidatedStyle = {
    backgroundColor: "#d9534f",
    padding: "4%",
    margin: "2%",
    borderRadius: "5px",
    color: "black",
  };
  const validatedStyle = {
    backgroundColor: "#5cb85c",
    padding: "4%",
    margin: "2%",
    borderRadius: "5px",
    color: "black",
  }

  var validateTimesheet = ()=>{
    console.log("validating");
    axios.get('https://htc2020-timecard.herokuapp.com/validateTimecard', {
      params: {
        id: props.data._id
      }
    })
    .then(response => {
      console.log('validated');
      setButton(<Button variant="secondary" className="mybtn" disabled>Validated</Button>);
    })
  }

  var contact = ()=>{

  }

  const [taskList, setTaskList] = useState();
  const [userName, setUserName] = useState();
  const [currStyle, setCurrStyle] = useState(unvalidatedStyle);
  const [button, setButton] = useState(
    <div>
      <Button variant="secondary" className="mybtn" onClick={validateTimesheet}>Validate</Button>
      <a href="mailto:employee@example.com"><Button variant="secondary" className="mybtn" onClick={contact}>Contact</Button></a>
    </div>
  );
  const [heavy, setHeavy] = useState();

  const getCompletedTasks = () => {
    var completedTasks = [];
    for (const task of props.data.entries) {
      completedTasks.push(<TimeSheetTask task={task}/>);
    }
    setTaskList(completedTasks)
  }
  
  const getUserName = () => {
    axios.get('https://htc2020-timecard.herokuapp.com/getPersonInfo', {
      params: {
        id: props.data.id
      }
    })
    .then(response => {
      setUserName(response.data.name);
    })
  }



  const getButton = () =>{
    console.log("getbutton");
    console.log(props.data.validated);
    if(props.data.validated=="True"){
      setButton(<Button variant="secondary" className="mybtn" disabled>Validated</Button>);
      setCurrStyle(validatedStyle);
    }
  }

  useEffect(() => {
    getUserName();
    getCompletedTasks();
    getButton();
  }, []);

  return (
    <div style={currStyle}>
      <h5>Name: {userName}</h5>
      { (props.data.flagged == "True")? (
        <p className="heavy-equip">*THIS EMPLOYEE USED HEAVY EQUIPMENT; MANUAL PAYCODE VALIDATION REQUIRED*</p>
      ) : (
        <div></div>
      )}
      {taskList}
      <Container>
        <Row>
          <Col className="text-center">
            {button}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default TimeSheet;