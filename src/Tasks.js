import React, {useState, useEffect} from 'react';
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
  const [timeCardData, setTimeCardData] = useState('hello world 2');
  const [premiumData, setPremiumData] = useState('hello world 1');
  const [posting, startPosting] = useState(false);

  useEffect(() => {
    if (true) {
      console.log([timeCardData]);
      console.log("i updated ^");
    }
  }, [timeCardData]);

  const eventHandlerTimeCard = data => {
    console.log('got em bois: this is my timeCardData');
    setTimeCardData(data);
    console.log(data);
    console.log(timeCardData);
  }

  const eventHandlerPremium = premData => {
    console.log('got premium data');
    setPremiumData(premData);
    console.log(premData);
    console.log(premiumData);
  }
  
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

  useEffect(() => {
    if (posting) {
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
    }
  }, [posting]);

  const handleSubmit = () => {
    console.log('this is what were working w/');
    console.log(timeCardData);
    console.log(premiumData);
    startPosting(true);
    setTc([false, null, null, true, disabledStyle, "Completed"]);
    startPosting(false);
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

