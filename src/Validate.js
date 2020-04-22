import  React, { useEffect , useState } from 'react';
import { Navbar } from 'react-bootstrap';
import logo from './assets/logo.svg';
import { Link } from 'react-router-dom';
import './App.css';
import TimeSheet from './timesheet'
import axios from 'axios';


const userid = '123';

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
      <div className="nav-md">
        <Navbar bg="light">
          <Navbar.Brand>
            <img className="nav-logo" src={logo} alt="logo" />
          </Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as: {props.location.state.userid}
              <Link to='/'>
                <p style={{ textAlign: "right", padding: "none" }}>Log Out</p>
              </Link>
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
      </div>
      <h4 className="t-valid">Timesheet Validation</h4>
      {timeSheets}
    </div>
  );
}

export default Validate;