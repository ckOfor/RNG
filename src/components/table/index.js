// react
import React, { Component } from 'react';

// third party
import { Table } from 'react-materialize'

class TableComponent extends Component {
  state={
    tableList: this.props.list.length > 0 ? this.props.list : []
  }
  
  componentDidMount() {
    this.setState({ tableList: this.props.list })
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({ tableList: nextProps.list })
  }
  
  render() {
    let { tableList } = this.state
    return (
      <div style={{ marginLeft: 300, height: 500, width: 1000, marginTop: 50, display: 'block',
        overflow:'auto' }}>
        <Table style={{  }}>
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
                  <tr>
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
    );
  }
}

export default TableComponent;
