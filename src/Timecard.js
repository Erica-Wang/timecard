import React from 'react';
import './App.css';
import {Form} from 'react-bootstrap';

function Timecard() {
  return (
    <div className="timecard">
      <Form className="timecard-form">
        <Form.Group controlId="equimentNumber">
          <Form.Label>Equipment #</Form.Label>
          <Form.Control type="" placeholder="12-150" />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group controlId="hour">
          <Form.Label>Hours</Form.Label>
          <Form.Control type="" placeholder="" />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group controlId="overtime">
          <Form.Label>Overtime? </Form.Label>
          <Form.Check inline label="x 1.5" type='radio' />
          <Form.Check inline label="x 2.0" type='radio' />
        </Form.Group>
      </Form>
    </div>
  );
}

export default Timecard;
