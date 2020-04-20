import React, {useState} from 'react';
import './App.css';
import {Button} from 'react-bootstrap';
import ReactHtmlParser from "react-html-parser";
import Timecard from './Timecard';

const loops = (jsonData) =>{
  var output = "";
  for (var i = 0; i < jsonData.length(); i++){
    output += "<div className='task'>" +
    "<p className='task-att'>Job: "+jsonData.job+"</p>" +
    "<p className='task-att'>Job Code: "+props.jobCode+ "</p>" +
    "<p className='task-att'>Activity: "+props.activity+ "</p>" +
    "<p className='task-att'>Activity Code: "+props.activityCode +"</p>" +
    "<p className='task-att'>Notes: "+props.notes+"</p>" +
    "<p className='task-att'>Assigning Manager: {props.manager}</p>" +
    "<p className='task-att'>Time Code: :"+ props.timeCode+"</p>" +
    "<Button className='task-btn'>Task Complete</Button>" +
  "</div>"
  }
}
const Tasks = (props) => {
  const [tc, setTc] = useState();
  
  return (
    ReactHtmlParser(loops(jsonData))
  );
}

export default Tasks;
