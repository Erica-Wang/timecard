import React, {useEffect, useState} from 'react';
import './App.css';
import {Button, Container, Row, Col} from 'react-bootstrap';
import Assigncard from './Assigncard';
import axios from 'axios';

const Assignments = (props) => {
    const notDisabledStyle = {
      backgroundColor: "#ededed",
      borderRadius: "5px",
      color: "black",
      marginBottom: "2%",
      marginRight: "2%",
      marginLeft: "2%",
      padding: "4%",
    };
    const disabledStyle = {
      backgroundColor: "#ededed",
      color: "grey",
      borderRadius: "5px",
      marginBottom: "2%",
      padding: "4%",
    };

    const [ac, setAc] = useState([false, null, null, false, notDisabledStyle, "Assign Task"]);
    const [assignCardData, setAssignCardData] = useState();
    const [posting, startPosting] = useState(false);


    useEffect(() => {
      if (posting){
        console.log("we made it!");
        console.log([assignCardData]);
        console.log(assignCardData.employees);
        axios.get('https://htc2020-timecard.herokuapp.com/assignTaskAll/', {
            params: {
              employees: assignCardData.employees,
              managerID: props.userid,
              notes: assignCardData.notes,
              id: props.id
            }
          })
      }
      
    }, [posting]);

    const handleSubmit = () => {
        startPosting(true);
        setAc([false, null, null, true, disabledStyle, "Assigned"]);
        console.log('Posted!');
    }

    const eventHandler = data => {
      console.log('got em bois');
      setAssignCardData(data);
      console.log(data);
    }

    function handleClick() {
        if (ac[0]) {
          setAc([false, null, null, false, notDisabledStyle, "Assign Task"]);
        } else {
        setAc([
          true, 
          <Assigncard onChange={eventHandler}/>,
          <Button className="submit-btn" onClick={handleSubmit}>Submit</Button>,
          false,
          notDisabledStyle,
          "Collapse"]);
        }
    }
  return (
    <div className="task" style={ac[4]}>
      <p className="task-att"><b>Job:</b> {props.jobCode}</p>
      <p className="task-att"><b>Activity:</b> {props.activityCode} </p>
      <p className="task-att"><b>Job/Activity Description:</b> {props.description} </p>
      <p className="task-att">Assigning Manager: {props.managerAssigned}</p>
      <Button className="task-btn" onClick={handleClick} disabled={ac[3]}>{ac[5]}</Button>
      {ac[1]}
      <Container>
        <Row>
          <Col className="text-center">
            {ac[2]}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Assignments;