import React from 'react'
import { Container, Col, Row, Button, Input, Table } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const ListItems = ({ values, index, clickEvent }) => (
  <tr>
    <td>
      {index}
    </td>
    <td>
      {values[index].date.toString()}
    </td>
    <td>
      {values[index].text}
    </td>
    <td>
      <Button color="danger" onClick={clickEvent} index={index} data-date={values[index].date.toString()}>Delete</Button>
    </td>
  </tr>
);

const List = ({ items, onRemove }) => (
  <Table dark>
    <thead>
      <tr>
        <th width="10%">#</th>
        <th width="30%">Name</th>
        <th width="30%">Date</th>
        <th width="30%"></th>
      </tr>
    </thead>
    <tbody>
      {
        items.map((item, index) =>
          <ListItems key={index} values={items} index={index} clickEvent={onRemove} />
        )
      }
    </tbody>
  </Table>
)

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      inputValues: '',
      rows: []
    }
    this.onRemove = this.onRemove.bind(this);
  }

  onClick = () => {
    const { inputValues, rows } = this.state;
    if (inputValues) {
      const today = new Date();
      const data = {
        "text": inputValues,
        "date": today.getDate() + "/"
          + (today.getMonth() + 1) + "/"
          + today.getFullYear() + " "
          + today.getHours() + ":"
          + today.getMinutes() + ":"
          + today.getSeconds()
      }
      const newData = [...rows, data];
      this.setState({ rows: newData, inputValues: '' });
    } else {
      alert("Name cannot be empty");
    }
  }

  onChange = (e) => this.setState({ inputValues: e.target.value });

  onRemove = (e) => {
    const thisData = this.state.rows;
    const indexData = thisData[e.target.getAttribute("index")];
    const finalData = thisData.filter(item => item !== indexData);
    this.setState({
      rows: finalData
    });
    this.forceUpdate();
  }

  render() {
    const { rows, inputValues } = this.state;
    console.log(rows);
    return (
      <Container>
        <Row>
          <Col md="4">
            <h3>React Dynamic Table Update</h3>
            <hr />
          </Col>
        </Row>
        <Row>
          <Col md="4">
            <Input type="text" onChange={this.onChange} value={inputValues} name="name" />
          </Col>
          <Col md="4">
            <Button color="success" onClick={this.onClick} id="add">Add</Button>
          </Col>
          <Col md="8" className="table-container">
            <h3>Table Contents</h3>
            <List items={rows} onRemove={this.onRemove} />
          </Col>
        </Row>
      </Container>
    )
  }
}

export default App;