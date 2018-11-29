// react
import React, { Component } from 'react';

// third party
import {
  Navbar,
  NavItem,
  Button,
  Row,
  Input,
  // Dropdown,
  Modal,
  Table,
} from 'react-materialize'

import $ from 'jquery';
import { DropdownButton, MenuItem, Label } from 'react-bootstrap';

// const bootstrap = require('bootstrap');
// console.log(bootstrap)

// image
import logo from '../logo.svg';


// styles
import '../App.css';

// const fs = require('browserify-fs');
import fs from 'fs';


class App extends Component {
  state={
    generatedNumbers: [],
    userRange: '',
    minValue: '',
    maxValue: '',
    selected: '',
    mounted: false
  }
  
  componentDidMount(){
    this.mounted = true;
  }
  
  componentWillMount() {
    fs.readFile('../../data.txt', 'utf-8', (err, generatedNumbers) => !err
      ? this.setState({ generatedNumbers: JSON.parse(generatedNumbers) }) : null); // eslint-disable-line
  }
  
  componentWillUnmount(){
    this.mounted = false;
  }
  
  onGenerateButtonClick = (userRange) => {
    return userRange > 0 && userRange <= 5000 &&
      this.phoneNumberGenerator(userRange)
  }
  
  phoneNumberGenerator = (userRange) => {
    let phoneNumbers, generatedNumbers = [];
    
    for ( let i = 0; i < userRange; i++) {
      phoneNumbers = `0${Math.floor(Math.random() * 1111111111)}`
      generatedNumbers.push({ id: i + 1,  value: phoneNumbers });
    }
    
    this.setState({ generatedNumbers })
    const dataToWrite = JSON.stringify(generatedNumbers);
    fs.writeFile('../../numbers.txt', dataToWrite, () => {});
    
    this.returnMaxAndMin(generatedNumbers, "min")
    this.returnMaxAndMin(generatedNumbers, "max")
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
  
  returnMaxAndMin = (generatedNumbers, whatIWant) => {
    let minValue = generatedNumbers[0].value;
    let maxValue = 0;
    
    if(whatIWant === "min") {
      Object.keys(generatedNumbers).forEach((value) => {
        if (generatedNumbers[value].value < minValue) {
          minValue = generatedNumbers[value].value
        }
      })
      this.setState({ minValue })
    }
    
    if(whatIWant === "max") {
      Object.keys(generatedNumbers).forEach((value) => {
        if (maxValue < generatedNumbers[value].value) {
          maxValue = generatedNumbers[value].value
        }
      })
  
      this.setState({ maxValue })
    }
  }
  
  sort = (generatedNumbers,by) => {
    if(by === "asc" || by ==="dsc") {
      this.sortGeneratedNumbers(generatedNumbers, by)
    }
  }
  
  render() {
    let { generatedNumbers } = this.state
    let num = [1,2,3,4,5]
    return (
      <div className="App">
        <Navbar brand='RNG' right>
          <NavItem>
            Total : { Object.keys(this.state.generatedNumbers).length && Object.keys(this.state.generatedNumbers).length }
          </NavItem>
        </Navbar>
        
        {/*<TableComponent list={this.state.generatedNumbers} />*/}
        <div style={{ marginLeft: 200, height: 500, width: 1000, marginTop: 40, display: 'block',
          overflow:'auto' }}>
          <Table className="table">
            <thead>
            <tr>
              <th data-field="id">S/N</th>
              <th data-field="name">Unique ID</th>
              <th data-field="price">Phone Numbers</th>
              <th style={{ width: 150, marginLeft: 10 }} data-field="price">Min: {this.state.minValue}</th>
              <th style={{ width: 150, marginLeft: 10 }} data-field="price">Max: {this.state.maxValue}</th>
            </tr>
            </thead>
            <tbody>
            {
              (
                Object.keys(generatedNumbers).map((row, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{generatedNumbers[row].id}</td>
                      <td>{generatedNumbers[row].value}</td>
                    </tr>
                  )
                })
              )
            }
            </tbody>
          </Table>
        </div>
        <div style={{ marginLeft: 300, marginBottom: 500 }}>
          <Row style={{ marginBottom: 500 }}>
            <Input
              className="range"
              s={4}
              label="Enter Range 1 <= 5000"
              onChange={userRange => this.setState({ userRange: userRange.target.value.replace(/\D/g, '') })}
              value={this.state.userRange}
            />
            <DropdownButton
              id="dropdown" title="Filter by">
              <MenuItem
                onClick={() => this.sort(generatedNumbers,"asc")} id="sdf" className="asc" href="#books">Ascending</MenuItem>
                {/*onClick={() => this.sortGeneratedNumbers(generatedNumbers, "asc")} id="sdf" className="asc" href="#books">Ascending</MenuItem>*/}
              <MenuItem
                onClick={() => this.sort(generatedNumbers,"dsc")} className="dsc" href="#podcasts">Descending</MenuItem>
                {/*onClick={() => this.sortGeneratedNumbers(generatedNumbers, "dsc")} className="dsc" href="#podcasts">Descending</MenuItem>*/}
              <MenuItem onClick={() => this.returnMaxAndMin(generatedNumbers, "min")} className="min" href="#">Minimum</MenuItem>
              <MenuItem onClick={() => this.returnMaxAndMin(generatedNumbers, "max")} className="max" href="#">Maximum</MenuItem>
            </DropdownButton>
            <Button
              className="generate"
              style={{ marginTop: 0, marginLeft: 40 }}
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
