import React, {useState, useEffect} from 'react';
import './App.css';
import {Button} from 'react-bootstrap';
import axios from 'axios';



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
      <p className="task-att">Job: {props.task.jobCode}</p>
      <p className="task-att">Activity: {props.task.activityCode} </p>
      <p className="task-att">Rate: {props.task.rate}</p>
      <p className="task-att">Hours Worked: {props.task.hrs}</p>
      <p className="task-att">Premiums: {premiums.length}</p>
      <ul>
        {prems}
      </ul>
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
    backgroundColor: "#ededed",
    padding: "4%",
    margin: "2%",
    borderRadius: "5px",
  };
  const heavyEquip = {
    backgroundColor: "yellow",
    padding: "4%",
    margin: "2%",
    borderRadius: "5px",
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
      setButton(<Button disabled>Validated</Button>);
    })
  }

  var contact = ()=>{

  }

  const [taskList, setTaskList] = useState();
  const [userName, setUserName] = useState();
  const [button, setButton] = useState(
    <div>
      <Button onClick={validateTimesheet}>Validate</Button>
      <a href="mailto:employee@example.com"><Button onClick={contact}>Contact</Button></a>
    </div>
  );

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
      setButton(<Button disabled>Validated</Button>);
    }
  }



  useEffect(() => {
    getUserName();
    getCompletedTasks();
    getButton();
  }, []);
  return (
    <div style={unvalidatedStyle}>
      <h6>Name: {userName} <br />Flagged: {props.data.flagged} </h6>
      {taskList}
      {button}
    </div>
  );
}

export default TimeSheet;