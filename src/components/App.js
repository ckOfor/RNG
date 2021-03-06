// react
import React, { Component } from 'react';

// third party
import {
  Navbar,
  NavItem,
  Button,
  Row,
  Input,
  Dropdown,
  Modal,
  Table,
} from 'react-materialize'

// styles
import '../App.css';

// fs
import fs from 'fs';

class App extends Component {
  state={
    generatedNumbers: [],
    userRange: '',
    minValue: '',
    maxValue: '',
    selected: '',
    mounted: false,
    tableList: []
  }
  
  componentDidMount(){
    this.mounted = true;
  }
  
  componentWillMount() {
    setTimeout(() => {
      fs.readFile('../../numbers.txt', 'utf-8', (err, generatedNumbers) => !err
        ? this.setComponentState(JSON.parse(generatedNumbers)) : null); // eslint-disable-line
      
    }, 200)
  }
  
  setComponentState = (generatedNumbers) => {
    this.setState({generatedNumbers, tableList: generatedNumbers}, () => this.returnMaxAndMin(generatedNumbers));
  }
  
  componentWillUnmount(){
    this.mounted = false;
  }
  
  onGenerateButtonClick = (userRange) => {
    return userRange > 0 && userRange <= 5000 ?
      this.phoneNumberGenerator(userRange)
      : window.Materialize.toast('You can only enter numbers between 0 - 5001', 10000)
  }
  
  phoneNumberGenerator = (userRange) => {
    let phoneNumbers, generatedNumbers = [];
    
    for ( let i = 0; i < userRange; i++) {
      phoneNumbers = `0${Math.floor(Math.random() * 111111111)}`
      generatedNumbers.push({ id: i + 1,  value: phoneNumbers });
    }
    
    this.setState({ generatedNumbers, tableList: generatedNumbers })
    const dataToWrite = JSON.stringify(generatedNumbers);
    fs.writeFile('../../numbers.txt', dataToWrite, () => {});
    
    this.returnMaxAndMin(generatedNumbers)
  }
  
  sortGeneratedNumbers = (generatedNumbers, choice) => {
    if(choice === "asc") {
      this.setState({
        generatedNumbers: generatedNumbers.sort( function ( a, b )
        { return a.value - b.value; })
      })
      
      return generatedNumbers
    }
    
    if(choice === "dsc") {
      this.setState({
        generatedNumbers: generatedNumbers.sort( function ( a, b )
        { return b.value - a.value; })
      })
      
      return generatedNumbers
    }
  }
  
  returnMaxAndMin = (generatedNumbers, whatToReturn) => {
    let minValue = generatedNumbers[0].value;
    let maxValue = 0;
    
    Object.keys(generatedNumbers).forEach((value) => {
      if (generatedNumbers[value].value < minValue) {
        minValue = generatedNumbers[value].value
      }
    })
    
    Object.keys(generatedNumbers).forEach((value) => {
      if (maxValue < generatedNumbers[value].value) {
        maxValue = generatedNumbers[value].value
      }
    })
    
    this.setState({ minValue, maxValue })
  }
  
  updateRange = (event) => {
    event.preventDefault();
    const { value } = event.target;
  
    this.setState({ userRange: value });
  }
  
  render() {
    let { generatedNumbers, tableList } = this.state
    return (
      <div className="App">
        <Navbar brand='RNG' right>
          <NavItem>
            Total : { Object.keys(this.state.generatedNumbers).length && Object.keys(this.state.generatedNumbers).length }
          </NavItem>
        </Navbar>
        
        {/*<TableComponent list={this.state.generatedNumbers} />*/}
        <div style={{ marginLeft: 300, height: 500, width: 1000, marginTop: 50, display: 'block',
          overflow:'auto' }}>
          <Table className="table">
            <thead>
            <tr>
              <th data-field="id">S/N</th>
              <th data-field="name">Unique ID</th>
              <th data-field="price">Phone Numbers</th>
            </tr>
            </thead>
            <tbody>
            {
              (
                Object.keys(tableList).map((row, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{tableList[row].id}</td>
                      <td>{tableList[row].value}</td>
                    </tr>
                  )
                })
              )
            }
            </tbody>
          </Table>
        </div>
        
        <div style={{ marginLeft: 300, marginTop: 50 }}>
          <Row>
            <Dropdown
              className="dropdown"
              trigger={<Button style={{ marginTop: 20, marginLeft: 40  }}>Filter by:</Button>}>
              <NavItem
                className="asc"
                onClick={() => this.sortGeneratedNumbers(this.state.generatedNumbers, "asc")}
              >
                Ascending
              </NavItem>
              <NavItem
                className="dsc"
                onClick={() => this.sortGeneratedNumbers(this.state.generatedNumbers, "dsc")}
              >
                Descending
              </NavItem>
              <NavItem divider />
              <Modal
                header={`Minimum: ${this.state.minValue}`}
                trigger={<NavItem className="min">Min</NavItem>}>
              </Modal>
              <Modal
                header={`Maximum: ${this.state.maxValue}`}
                trigger={<NavItem className="max">Max</NavItem>}>
              </Modal>
            </Dropdown>
            
            <Input
              className="range"
              s={2}
              onChange={this.updateRange}
              label="Enter Range 1 <= 5000"
            />
            <Button
              className="generate"
              style={{ marginTop: 20, marginLeft: 40 }}
              s={6}
              onClick={() => this.onGenerateButtonClick(this.state.userRange)}
              waves='light'>
              GENERATE
            </Button>
          </Row>
        </div>
      </div>
    );
  }
}

export default App;
