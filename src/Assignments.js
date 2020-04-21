import React, {Component} from 'react';
import {useState} from 'react';
import './App.css';
import {Button} from 'react-bootstrap';
import Assigncard from './Assigncard';
import axios from 'axios';



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

    const handleSubmit = () => {
        setAc([false, null, null, true, disabledStyle, "Completed"]);
        axios.get('https://htc2020-timecard.herokuapp.com/assignTask/', {
          params: {
            workerID: 'STE001',
            managerID: 'STE001',
            notes: 'Hi Hello',
            id: '5e9d03d22e6a6d30eaa897e3'
          }
        })
        console.log('Posted!');
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