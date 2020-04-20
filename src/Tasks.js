import React from 'react';
import './App.css';
import {Button} from 'react-bootstrap';

function Tasks() {
  return (
    <div className="task">
      <p className="task-att">Job: </p>
      <p className="task-att">Job Code: </p>
      <p className="task-att">Activity: </p>
      <p className="task-att">Job Code: </p>
      <p className="task-att">Notes: </p>
      <p className="task-att">Assigning Manager: </p>
      <p className="task-att">Time Code: </p>
      <Button className="task-btn">Task Complete</Button>
    </div>
  );
}

export default Tasks;
