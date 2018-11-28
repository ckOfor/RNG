// react
import React, { Component } from 'react';

// third party
import { Navbar, NavItem, Button, Row, Input, Dropdown, Modal } from 'react-materialize'

// component
import TableComponent from '../components/table';

// image
import logo from '../logo.svg';


// styles
import '../App.css';
import '../App.css';

const fs = require('browserify-fs');

class App extends Component {
  state={
    generatedNumbers: [],
    userRange: '',
    minValue: '',
    maxValue: ''
  }
  
  componentDidMount() {
    fs.readFile('../../numbers.txt', 'utf-8', (err, generatedNumbers) => !err
      ? this.setState({ generatedNumbers: JSON.parse(generatedNumbers) },
        () => this.returnMaxAndMin(this.state.generatedNumbers))
      : console.log('Failed', err));
  }
  
  onGenerateButtonClick = (userRange) => {
    return userRange > 0 && userRange <= 5000
      ? this.phoneNumberGenerator(userRange)
      : window.Materialize.toast('Enter a valid range between 1 and 5000', 10000)
  }
  
  phoneNumberGenerator = (userRange) => {
    let phoneNumbers, generatedNumbers = [];
    
    for ( let i = 0; i < userRange; i++) {
      phoneNumbers = `0${Math.floor(Math.random() * 1111111111)}`
      generatedNumbers.push({ id: i + 1,  value: phoneNumbers });
    }
    
    this.setState({ generatedNumbers })
    const dataToWrite = JSON.stringify(generatedNumbers);
    fs.writeFile('../../numbers.txt', dataToWrite, (err) => {
      if (err) throw err;
      window.Materialize.toast('File has been saved!', 10000)
    });
  
    this.returnMaxAndMin(generatedNumbers)
  }
  
  sortGeneratedNumbers = (generatedNumbers, choice) => {
    if(choice === "asc") {
      this.setState({
        generatedNumbers: generatedNumbers.sort( function ( a, b )
        { return a.value - b.value; })
      })
    }
  
    if(choice === "dsc") {
      this.setState({
        generatedNumbers: generatedNumbers.sort( function ( a, b )
        { return b.value - a.value; })
      })
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
  
  render() {
    return (
      <div className="App">
        {/*<header className="App-header">*/}
          {/*<img src={logo} className="App-logo" alt="logo" />*/}
          {/*<p>*/}
            {/*Edit <code>src/App.js</code> and save to reload.*/}
          {/*</p>*/}
          {/*<a*/}
            {/*className="App-link"*/}
            {/*href="https://reactjs.org"*/}
            {/*target="_blank"*/}
            {/*rel="noopener noreferrer"*/}
          {/*>*/}
            {/*Learn React*/}
          {/*</a>*/}
        {/*</header>*/}
        <Navbar brand='RNG' right>
          <NavItem>
            Total : { Object.keys(this.state.generatedNumbers).length && Object.keys(this.state.generatedNumbers).length }
          </NavItem>
        </Navbar>
        
        <TableComponent list={this.state.generatedNumbers} />
        <div style={{ marginLeft: 300, marginTop: 50 }}>
          <Row>
            <Input
              s={2}
              label="Enter Range"
              onChange={userRange => this.setState({ userRange: userRange.target.value.replace(/\D/g, '') })}
              value={this.state.userRange}
            />
            <Button
              style={{ marginTop: 20, marginLeft: 40 }}
              s={6}
              onClick={() => this.onGenerateButtonClick(this.state.userRange)}
              waves='light'>
              GENERATE
            </Button>
            <Dropdown trigger={
              <Button style={{ marginTop: 20, marginLeft: 40  }}>Filter by:</Button>
            }>
              <NavItem onClick={() => this.sortGeneratedNumbers(this.state.generatedNumbers, "asc")}>Ascending</NavItem>
              <NavItem onClick={() => this.sortGeneratedNumbers(this.state.generatedNumbers, "dsc")}>Descending</NavItem>
              <NavItem divider />
              <Modal
                header={`Minimum: ${this.state.minValue}`}
                trigger={<NavItem>Min</NavItem>}>
              </Modal>
              <Modal
                header={`Maximum: ${this.state.maxValue}`}
                trigger={<NavItem>Max</NavItem>}>
              </Modal>
            </Dropdown>
            <Button
              style={{ marginTop: 20, marginLeft: 40 }}
              s={6}
              onClick={() => window.Materialize.toast('Coming soon!', 10000)}
              waves='light'>
              Download
            </Button>
          </Row>
          
          {}
          
        </div>
      </div>
    );
  }
}

export default App;
