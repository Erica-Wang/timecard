import React, {useState} from 'react';
import './App.css';
import {Button} from 'react-bootstrap';
import Assigncard from './Assigncard';


const Assignments = (props) => {
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
    const [ac, setAc] = useState([false, null, null, false, notDisabledStyle, "Assign Task"]);

    function handleSubmit() {
        setAc([false, null, null, true, disabledStyle, "Completed"]);
    }

    function handleClick() {
        if (ac[0]) {
          setAc([false, null, null, false, notDisabledStyle, "Task Complete"]);
        } else {
        setAc([
          true, 
          <Assigncard />,
          <Button className="submit-btn" onClick={handleSubmit}>Submit</Button>,
          false,
          notDisabledStyle,
          "Collapse"]);
        }
    }
  return (
    <div className="task" style={ac[4]}>
      <p className="task-att">Job: {props.jobCode}</p>
      <p className="task-att">Activity: {props.activityCode} </p>
      <p className="task-att">Assigning Manager: {props.managerAssigned}</p>
      <Button className="task-btn" onClick={handleClick} disabled={ac[3]}>{ac[5]}</Button>
      {ac[1]}
      {ac[2]}
    </div>
  );
}

export default Assignments;