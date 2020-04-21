import React, {useState} from 'react';
import './App.css';
import {Button} from 'react-bootstrap';
import Timecard from './Timecard';
import axios from 'axios';


export const Tasks = (props) => {
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
  const [timeCardData, setTimeCardData] = useState();
  const [premiumData, setPremiumData] = useState();

  function handleSubmit() {

    const convertPremiumToJson = (PremiumData) => {
      var jsonData = {};
      for (const premium of PremiumData) {
        console.log(premium);
        if (premium.pre.toUpperCase() == 'MEAL ALLOWANCE') {
          //jsonData.premium.pre.toUpperCase() = "";
        } else {
         //jsonData.premium.pre.toUpperCase() = premium.hours;
        }
      }
    }

    axios.get('https://htc2020-timecard.herokuapp.com/completeTask', {
      params: {
        id: props.userid,
        jobCode: props.jobCode,
        activityCode: props.activityCode,
        rate: timeCardData.rate,
        hrs: timeCardData.hour,
        premiums: convertPremiumToJson(premiumData),
        memo: timeCardData.memo,
        equipment: timeCardData.equipment
      }
    })
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
    setTc([false, null, null, true, disabledStyle, "Completed"]);
  }

  const eventHandlerTimeCard = data => {
    console.log('got em bois: this is my timeCardData');
    setTimeCardData(data);
    console.log(data);
    console.log('this is my hour');
    console.log(data.hour);
  }

  const eventHandlerPremium = premData => {
    console.log('got premium data');
    setPremiumData(premData);
    console.log(premData);
  }

  function handleClick() {
    if (tc[0]) {
      setTc([false, null, null, false, notDisabledStyle, "Task Complete"]);
    } else {
    setTc([
      true, 
      <Timecard onChangeP={eventHandlerPremium} onChangeTC={eventHandlerTimeCard}/>,
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
export const NoTasks = () => {
  return (
    <div>
        <h1>this dude has no tasks</h1>
    </div>
  );
}

