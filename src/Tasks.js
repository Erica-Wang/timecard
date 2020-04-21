import React, {useState} from 'react';
import './App.css';
import {Button} from 'react-bootstrap';
import Timecard from './Timecard';


const Tasks = (props) => {
  const [tc, setTc] = useState([false, null]);
  //const [tc_toggle, setToggle] = useState(false);

  function handleClick() {
    if (tc[0]) {
      setTc([false, null]);
    } else {
    setTc([true, <Timecard />]);
    }
  }

  return (
    <div className="task">
      <p className="task-att">Job: {props.jobCode}</p>
      <p className="task-att">Activity: {props.activityCode} </p>
      <p className="task-att">Notes: {props.notes}</p>
      <p className="task-att">Assigning Manager: {props.managerAssigned}</p>
      <Button className="task-btn" onClick={handleClick}>Task Complete</Button>
      {tc[1]}
    </div>
  );
}

export default Tasks;