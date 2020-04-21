import React, {useState, useEffect} from 'react';
import './App.css';
import {Form, Button} from 'react-bootstrap';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


function createData(pre, hours) {
  return {pre, hours};
}

const Premium = (props) => {

  const [pre, setPre] = useState("Overtime x1.5");
  const [hours, setHours] = useState("");
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (props.onPremiumChange) {
      props.onPremiumChange(rows);
      console.log(rows);
    }
  },
  [rows]
  );
// const tStyle = {
//     width: "50%",
//     padding: "0.5em",
//     border: "solid black 1px",
//     borderCollapse: "true",
// };

// const rows = [
//   createData('Rahma', 20),
//   createData('Another', 20),
//   createData('final', 20)
// ];



const useStyles = makeStyles({
  table: {
    minWidth: "100%",
  },
});

const classes = useStyles();

const confirmPremium = () => {
  setRows(rows => [...rows, createData(pre, hours)]);
  console.log(rows);
}

return (
<div>
    {/* <table style={tStyle}>
    <tr>
        <th>Premium Name</th>
        <th>Hours</th>
    </tr>
    {row}
    </table> */}

    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple-table">
        <TableHead>
          <TableRow>
              <TableCell>Name of Premium</TableCell>
              <TableCell>Premium Hours</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell>{row.pre}</TableCell>
              <TableCell>{row.hours}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    <Form className="premium-form">
      <Form.Group onChange={(e) => setPre(e.target.value)} controlId="exampleForm.SelectCustomSizeSm">
          <Form.Label>Premium Type</Form.Label>
              <Form.Control as="select" custom>
              <option>Overtime x1.5</option>
              <option>Overtime x2.0</option>
              <option>Shift Premium</option>
              <option>Stand By Premium</option>
              <option>Appointed Crew Leader</option>
              <option>Responsibility</option>
              <option>Welder</option>
              <option>Meal Allowance</option>
          </Form.Control>
      </Form.Group>

      <Form.Group onChange={(e) => setHours(e.target.value)} controlId="premiumhours">
          <Form.Label>Hours Worked With Premium</Form.Label>
          <Form.Control type="number" placeholder="" />
          <Form.Text className="text-muted"></Form.Text>
      </Form.Group>

      <Button variant="primary" onClick={confirmPremium}>Confirm Premium</Button>

    </Form>
</div>
);
}

export default Premium;
