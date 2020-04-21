import React from 'react';
import './App.css';
import Assignments from './Assignments';
import axios from 'axios';

const assignListTest = require('./assets/testAssignList.json')
const assignList = []
for (const assign of assignListTest){
  assignList.push(<Assignments jobCode={assign.jobCode} activityCode={assign.activityCode} notes={assign.notes} managerAssigned={assign.managerAssigned} workerAssigned={assign.workerAssigned} />)
}

function Assign() {
  return (
    <div>
      <h1>This is where we assign tasks</h1>
      {assignList}
    </div>
  );
}

export default Assign;
