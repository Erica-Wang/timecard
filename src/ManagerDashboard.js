import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Navbar } from 'react-bootstrap';
import logo from './assets/logo.svg';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import CsvDownloader from 'react-csv-downloader';
import './App.css';
import { FaCloudDownloadAlt } from "react-icons/fa";

const ManagerDashboard = (props) => {

  const [csv, setCSV] = useState();

  const exportDatas = () => {
    axios.get('https://htc2020-timecard.herokuapp.com/getcsv')
      .then(res => {
        const datas = [];
        var i = 0;
        for (i = 0; i < res.data.length; i++) {
          const row = {
            EmployeeName: res.data[i].EmployeeName,
            EmployeeID: res.data[i].EmployeeID,
            EmployeeType: res.data[i].EmployeeType,
            Date: res.data[i].Date,
            JobCode: res.data[i].JobCode,
            ActivityCode: res.data[i].ActivityCode,
            Hours: res.data[i].Hours,
            Timecode: res.data[i].Timecode,
          }
          datas.push(row);
        }
        console.log(datas);
        setCSV(datas);
      });
  }

  useEffect(() => {
    exportDatas();
  }, []);

  const columns = [{
    id: 'EmployeeName',
    displayName: 'Employee Name'
  }, {
    id: 'EmployeeID',
    displayName: 'Employee ID'
  }, {
    id: 'EmployeeType',
    displayName: 'Employee Type'
  }, {
    id: 'Date',
    displayName: 'Date'
  }, {
    id: 'JobCode',
    displayName: 'Job Code'
  }, {
    id: 'ActivityCode',
    displayName: 'Activity Code'
  }, {
    id: 'Hours',
    displayName: 'Hours'
  }, {
    id: 'Timecode',
    displayName: 'Timecode'
  }];

  return (
    <div>
      <div className="background"></div>
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
      <div className="content">
        <h4 className="subtitle">Manager Dashboard</h4>
        <Container>
          <Row>
            <Col className="btn-divide">
              <Link className="btn-link" to={{
                pathname: "/manager-dashboard/assign-tasks",
                state: {
                  userid: props.location.state.userid
                }}}>
                <Button className="gen-btn" variant="success" type="submit">
                  Assign Tasks
                </Button>
              </Link>
            </Col>
            <Col className="btn-divide">
              <CsvDownloader
                filename="Worker Timesheets"
                separator=";"
                columns={columns}
                datas={csv}
                text="Export as CSV">
                <Button variant="secondary">
                  <FaCloudDownloadAlt />
              &nbsp;&nbsp;Export Timecards as CSV
            </Button>
              </CsvDownloader>
            </Col>
            <Col className="btn-divide">
              <Link to="/manager-dashboard/validate-timesheets">
                <Button className="gen-btn" type="submit">
                  Validate Timesheets
                </Button>
              </Link>
            </Col>
          </Row>
        </Container>


      </div>
    </div>

  );
}

export default ManagerDashboard;