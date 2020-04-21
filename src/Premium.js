import React from 'react';
import './App.css';
import {Form, Button} from 'react-bootstrap';

function Premium() {
  return (
    <div>
      <Form className="premium-form">
        <Form.Group controlId="premiumhours">
          <Form.Label>Hours Worked With Premium</Form.Label>
          <Form.Control type="" placeholder="" />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group controlId="exampleForm.SelectCustomSizeSm">
            <Form.Label>Premium Type</Form.Label>
                <Form.Control as="select" custom>
                <option>Overtime x1.5</option>
                <option>Overtime x2.0</option>
                <option>Shift Premium</option>
                <option>Stand By Premium</option>
                <option>Appointed Crew Leader</option>
                <option>Responsibility</option>
                <option>Welder</option>
            </Form.Control>
            <Button variant="primary">Confirm Premium</Button>
      </Form.Group>

      </Form>
    </div>
  );
}

export default Premium;
