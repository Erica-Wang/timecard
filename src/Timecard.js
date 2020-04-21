import React, {useState, useEffect} from 'react';
import './App.css';
import {Form, Button} from 'react-bootstrap';
import {FaPlus} from 'react-icons/fa';
import Premium from './Premium';

const Timecard = (props) => {

  // clicked, <Premium />
  const [info, setInfo] = useState([false, null]);
  const [equipmentNum, setEquipmentNum] = useState("");
  const [rate, setRate] = useState("");
  const [hour, setHour] = useState("");
  const [memo, setMemo] = useState("");
  const [premiumData, setPremiumData] = useState([]);


  function addPremium() {

    const eventHandlerPremium = data => {
      setPremiumData(data);
      console.log('this is my premium data');
      console.log(data);
      console.log(premiumData);
    }

    if (info[0]) {
      setInfo([false, null]);
    } else {
    setInfo([true, <Premium onPremiumChange={eventHandlerPremium} />]);
    }
  }

  useEffect(() => {
    if (props.onChangeP) {
      props.onChangeP(premiumData)
    }
  }, [premiumData]);

  // updating state for employee tasks
  useEffect(() => {
    var state = {
      info: info,
      equipmentNum: equipmentNum,
      rate: rate,
      hour: hour,
      memo: memo
    };

    if (props.onChangeTC) {
      props.onChangeTC(state);
    }
  },
  [info, equipmentNum, rate, hour, memo]
  );

  return (
    <div className="timecard">
      <Form className="timecard-form">
        <Form.Group onChange={(e) => setEquipmentNum(e.target.value)} controlId="equimentNumber">
          <Form.Label>Equipment Used</Form.Label>
          <Form.Control type="" placeholder="e.g. 12-150" />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group onChange={(e) => setRate(e.target.value)} controlId="rate"> 
          <Form.Label>Rate</Form.Label>
          <Form.Control type="" placeholder="" />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group onChange={(e) => setHour(e.target.value)} controlId="hour">
          <Form.Label>Hours Worked</Form.Label>
          <Form.Control type="" placeholder="" />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group onChange={(e) => setMemo(e.target.value)} controlId="memo">
          <Form.Label>Memo</Form.Label>
          <Form.Control type="" placeholder="Enter any notes to your manager here" />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group>
          <Button onClick={addPremium}>
            <FaPlus />
            &nbsp;Add Premiums
          </Button>
        </Form.Group>
        {info[1]}
      </Form>
    </div>
  );
}

export default Timecard;
