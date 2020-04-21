import React, {useState} from 'react';
import './App.css';
import {Button} from 'react-bootstrap';
import Assigncard from './Assigncard';


const Assignments = (props) => {
const [ac, setAc] = useState([false, null]);

function handleClick() {
    if (ac[0]) {
    setAc([false, null]);
    } else {
    setAc([true, <Assigncard />]);
    }
}
  return (
    <div className="task">
      <p className="task-att">Job: {props.jobCode}</p>
      <p className="task-att">Activity: {props.activityCode} </p>
      <p className="task-att">Assigning Manager: {props.managerAssigned}</p>
      <p className="task-att">Worker Assigned: {props.workerAssigned}</p>
      <p className="task-att">Notes: {props.notes}</p>
      <Button className="task-btn" onClick={handleClick}>Assign Task</Button>
      {ac}
    </div>
  );
}

export default Assignments;