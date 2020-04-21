import  React, { useEffect , useState } from 'react';
import './App.css';
import TimeSheet from './timesheet'
import axios from 'axios';



const Validate = (props) => {
  const [timeSheets, setTimeSheets] = useState();
  //const id = props.location.state.userid;
  const today = "2020 4 21";
  const getTimeSheets = (date) => {
    axios.get('https://htc2020-timecard.herokuapp.com/getTimeCards/')
    .then(response => {
      var timeSheetsList = []
      for (const timeCard of response.data) {
        console.log(timeCard);
        if (timeCard.date == date) {
          timeSheetsList.push(<TimeSheet data={timeCard}/>);
        }
      }
      setTimeSheets(timeSheetsList);
    })
    .catch(error => {
      console.log(error);
    });

  }
  useEffect(() => {
    getTimeSheets(today);
  }, []);

  
  return (
    <div>
      <h1>these are my timesheets!</h1>
      {timeSheets}
    </div>
  );
}

export default Validate;