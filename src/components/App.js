// react
import React, { Component } from 'react';

// third party
import { Navbar, NavItem, Button, Icon } from 'react-materialize'

// component
import TableComponent from '../components/table';

// image
import logo from '../logo.svg';

// styles
import '../App.css';
import '../App.css';

class App extends Component {
  onGenerateClick = () => {
    alert('Workss')
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
          <NavItem onClick={() => console.log('test click')}>Getting started</NavItem>
        </Navbar>
        <TableComponent />
        <div>
          <Button onClick={this.onGenerateClick} style={{ marginLeft: 500, marginTop: 50 }} waves='light'>GENERATE<Icon right>insert_chart</Icon></Button>
        </div>
      </div>
    );
  }
}

export default App;
