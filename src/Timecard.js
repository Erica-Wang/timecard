import React, {useState, useEffect} from 'react';
import './App.css';
import {Form, Button} from 'react-bootstrap';
import {FaPlus} from 'react-icons/fa';
import Premium from './Premium';

const Timecard = (props) => {

  // clicked, <Premium />
  const [info, setInfo] = useState([false, null]);

  function addPremium() {
    if (info[0]) {
      setInfo([false, null]);
    } else {
    setInfo([true, <Premium />]);
    }
  }

  useEffect(() => {
    if (props.onChange) {
      props.onChange(info);
    }
  },
  [info]
  );

  return (
    <div className="timecard">
      <Form className="timecard-form">
        <Form.Group controlId="equimentNumber">
          <Form.Label>Equipment Used</Form.Label>
          <Form.Control type="" placeholder="e.g. 12-150" />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group controlId="rate"> 
          <Form.Label>Rate</Form.Label>
          <Form.Control type="" placeholder="" />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group controlId="hour">
          <Form.Label>Hours Worked</Form.Label>
          <Form.Control type="" placeholder="" />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group>
          <Button onClick={addPremium}>
            <FaPlus />
            &nbsp;Add Premium
          </Button>
        </Form.Group>
        {info[1]}
      </Form>
    </div>
  );
}

export default Timecard;
