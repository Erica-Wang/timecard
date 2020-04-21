import React from 'react';
import './App.css';
import { Link, Route } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import CsvDownloader from 'react-csv-downloader';

function ManagerDashboard() {
  function exportCSV() {
    axios.get('https://htc2020-timecard.herokuapp.com/getcsv').then(res => {
      console.log(res);

    });

  }

  const columns = [{
    id: 'first',
    displayName: 'First column'
  }, {
    id: 'second',
    displayName: 'Second column'
  }];
 
  const datas = [{
    first: 'foo',
    second: 'bar'
  }, {
    first: 'foobar',
    second: 'foobar'
  }];

  return (
    <div class="dashboard">
      <h1>Manager Dashboard</h1>
      <hr></hr>
      <h4>Manager Options</h4>
      <Container>
        <Row>
          <Col className="btn-divide">
            <Link className="btn-link" to="/manager-dashboard/assign-tasks">
              <Button className="gen-btn" variant="success" type="submit">
                Assign Tasks
              </Button>
            </Link>
          </Col>
          <Col className="btn-divide">
            <Link className="btn-link" to="/manager-dashboard/validate-timesheets">
              <Button className="gen-btn" variant="success" type="submit">
                Validate Timesheets
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
      <CsvDownloader
        className="export-csv"
        filename="Worker Timesheets"
        separator=";"
        columns={columns}
        datas={datas}
        text="Export as CSV" />
    </div>
  );
}

export default ManagerDashboard;
