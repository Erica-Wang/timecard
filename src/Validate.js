import  React, { useEffect , useState } from 'react';
import './App.css';
import TimeSheet from './timesheet'
import axios from 'axios';



const Validate = (props) => {
  const [timeSheets, setTimeSheets] = useState();
  //const id = props.location.state.userid;
  var date = '';
  date += new Date().getFullYear() + ' ' + (new Date().getMonth() + 1) + ' ' + new Date().getDate();
  const getTimeSheets = (date) => {
    axios.get('https://htc2020-timecard.herokuapp.com/getTimeCards/')
    .then(response => {
      var timeSheetsList = [];
      for (const timeCard of response.data) {
        console.log(timeCard);
        if (timeCard.date == date) {
          timeSheetsList.push(<TimeSheet data={timeCard}/>);
        }
      }
      console.log(timeSheetsList);
      setTimeSheets(timeSheetsList);
    })
    .catch(error => {
      console.log(error);
    });

  }
  useEffect(() => {
    getTimeSheets(date);
  }, []);

  
  return (
    <div>
      <h4 className="t-valid">Timesheet Validation</h4>
      {timeSheets}
    </div>
  );
}

export default Validate;