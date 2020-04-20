import React, {useState} from 'react';
import './App.css';
import {Button} from 'react-bootstrap';
import Timecard from './Timecard';


const Tasks = (props) => {
  const [tc, setTc] = useState();
  
  return (
    <div className="task">
      <p className="task-att">Job: {props.job}</p>
      <p className="task-att">Job Code: {props.jobCode} </p>
      <p className="task-att">Activity: {props.activity} </p>
      <p className="task-att">Activity Code: {props.activityCode}</p>
      <p className="task-att">Notes: {props.notes}</p>
      <p className="task-att">Assigning Manager: {props.manager}</p>
      <p className="task-att">Time Code: {props.timeCode}</p>
      <Button className="task-btn" onClick={() => setTc((<Timecard />))}>Task Complete</Button>
      {tc}
    </div>
  );
}

export default Tasks;
