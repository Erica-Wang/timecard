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
  const [taskList, setTaskList] = useState();
  const [userName, setUserName] = useState();
  const [isFullyValidated, fullyValidate] = useState(false);
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
  useEffect(() => {
    getUserName();
    getCompletedTasks();
  }, []);
  return (
    <div>
      <h6>Name: {userName} <br />Flagged: {props.data.flagged} </h6>
      {taskList}
    </div>
  );
}

export default TimeSheet;