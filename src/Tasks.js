import React, {useState} from 'react';
import './App.css';
import {Button} from 'react-bootstrap';
import Timecard from './Timecard';


const Tasks = (props) => {
  const notDisabledStyle = {
    backgroundColor: "#ededed",
    borderRadius: "1em",
    color: "black",
    margin: "2%",
    padding: "2%",
  };
  const disabledStyle = {
    backgroundColor: "#ededed",
    color: "grey",
    borderRadius: "1em",
    margin: "2%",
    padding: "2%",
  };


  // toggle click, Timecard, Button, disabled, currStyle, btnWriting
  const [tc, setTc] = useState([false, null, null, false, notDisabledStyle, "Task Complete"]);

  function handleSubmit() {
    setTc([false, null, null, true, disabledStyle, "Completed"]);
  }

  function handleClick() {
    if (tc[0]) {
      setTc([false, null, null, false, notDisabledStyle, "Task Complete"]);
    } else {
    setTc([
      true, 
      <Timecard />,
      <Button className="submit-btn" onClick={handleSubmit}>Submit</Button>,
      false,
      notDisabledStyle,
      "Collapse"]);
    }
  }
  
  return (
    <div className="task" style={tc[4]}>
      <p className="task-att">Job: {props.jobCode}</p>
      <p className="task-att">Activity: {props.activityCode} </p>
      <p className="task-att">Notes: {props.notes}</p>
      <p className="task-att">Assigning Manager: {props.managerAssigned}</p>
      <Button className="task-btn" onClick={handleClick} disabled={tc[3]}>{tc[5]}</Button>
      {tc[1]}
      {tc[2]}
    </div>
  );
}

export default Tasks;