import React, { useState, useEffect } from "react";
import logo from './assets/logo.svg';
import {Navbar, Container, Row, Col, Nav} from 'react-bootstrap';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './App.css';
import GoogleMapReact from 'google-map-react';
import {FaMapMarkerAlt} from 'react-icons/fa';

const Marker = props => {
  return <FaMapMarkerAlt color="#0275d8" />
}

const JobMap = (props) => {
  console.log('i have this many tasks');
  console.log(props.location.state.numTasks);

  const [userInfo, setUserInfo] = useState({Name: ""});
  const userid = props.location.state.userid;
  const getUserInfo = () => {
    console.log("i am getting tasks");

    // get their user info
    axios.get('https://htc2020-timecard.herokuapp.com/getPersonInfo', {
      params: {
        id: userid
      }
    })
    .then(response => {
      setUserInfo(response.data);
      console.log("o");
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  }

  useEffect(() => {
    getUserInfo();
  }, []);

//   const AnyReactComponent = ({ text }) => <div>{text}</div>;
//   const stuff = {
//     center: {
//       lat: 59.95,
//       lng: 30.33
//     },
//     zoom: 11
//   };

const apiKey = {key: 'AIzaSyC-G9USLZl-X5PNWN6wkD3scL92ryQi9h4'}

  const [markers, setMarkers] = useState([]);

  const innisfilPoints = [
    {
      lat: 44.2806045,
      lng: -79.6473907
    },
    {
      lat: 44.3181304,
      lng: -79.5668999
    },
    {
      lat: 44.2286185,
      lng: -79.5433083
    },
    {
      lat: 44.3953696,
      lng: -79.5290112
    },
    {
      lat: 44.2804019,
      lng: -79.6130213
    },
    {
      lat: 44.3475629,
      lng: -79.6562229
    },
    {
      lat: 44.2997921,
      lng: -79.5689367
    },
    {
      lat: 44.3006436,
      lng: -79.5416798
    },
    {
      lat: 44.3475746,
      lng: -79.5398344
    },
    {
      lat: 44.3009,
      lng: -79.6115
    },
  ];

  for (var i = 0; i < props.location.state.numTasks; i++) {
    markers.push(<Marker
      lat={innisfilPoints[i]["lat"]}
      lng={innisfilPoints[i]["lng"]}
    />);
  }

  return (
    <div>
      <Navbar bg="light">
        <Navbar.Brand>
          <img className="nav-logo" src={logo} alt="logo" />
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: {userInfo.name}
            <Link to='/'>
              <p style={{textAlign:"right", padding:"none"}}>Log Out</p>  
            </Link> 
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
      <Container>
        <Row className="search-cont">
          <Col className="title" sm={8}><h4>Employee Dashboard</h4></Col>
          <Col className="search" sm={4}>
            <Nav className="justify-content-end" activeKey="/home">
              <Nav.Item className="ed-bc">
                <Link to={{
                pathname: "/employee-dashboard",
                state: {
                  userid: props.location.state.userid
                }}}> Tasks </Link> 
              </Nav.Item>
              <Nav.Item className="ed-bc">
                <Link to={{
                pathname: "/employee-dashboard/job-map",
                state: {
                  userid: props.location.state.userid
                }}}> Map </Link> 
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
      </Container>
      {/* <div style={{height: '100vh', width: '500px'}}>
          <GoogleMapReact 
            bootstrapURLKeys={{key: 'AIzaSyCb29b7bfQhT1MTAwDgH54Xj51u7pzFP50'}}
            defaultCenter={stuff.center}
            defaultZooM={stuff.zoom}>
            <AnyReactComponent 
                lat={59.955413}
                lng={30.337884}
                text="My Marker"
            />
          </GoogleMapReact>

      </div> */}

      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={apiKey}
          defaultCenter={{
            lat: 44.3009,
            lng: -79.6115
          }}
          defaultZoom={12}
        >
          {markers}
        </GoogleMapReact>
      </div>
    </div>
  );
}

export default JobMap;
