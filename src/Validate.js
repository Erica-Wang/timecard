import  { React, useEffect , useState } from 'react';
import './App.css';
import timeSheet from './timesheet'
import axios from 'axios';



const Validate = (props) => {
  const id = props.location.state.userid;
  
  function getTimesheets() {
    axios.get('https://htc2020-timecard.herokuapp.com/getTimeCards/')
    .then(response => {
      for (const timeCard of response.data) {
        console.log(timeCard);
        timeSheetsList.push(<timeSheet data={timeCard}/>);
      }
      return response.data
    })
    .catch(error => {
      console.log(error);
    });
  }

  const timeSheetsList = []
  
  return (
    <div>
      {timeSheetsList}
    </div>
  );
}

export default Validate;