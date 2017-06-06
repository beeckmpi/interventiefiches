// react imports
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
const paperTableStyle = {
  minWidth: '50%',
  maxWidth: '70%',
  marginBottom: '20px'
}
const tableStyle = {
  width: '100%'
}
// material-ui imports
import Paper from 'material-ui/Paper';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { Fiches } from '../../../api/fiches/fiches';

class MijnFiches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fixedHeader: true,
      fixedFooter: false,
      stripedRows: true,
      showRowHover: false,
      selectable: false,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      showCheckboxes: false,
      height: '300px',
    };
  }

  render() {
    const {deselectOnClickaway, enableSelectAll, fixedFooter, fixedHeader, multiSelectable, selectable, showCheckboxes, showRowHover, stripedRows} = this.state;
    return (
      <div className="container" style={{margin:"10px 0px 40px 230px"}}>
        <h3 style={{color:"#fff", marginLeft:"30px"}}>Mijn Fiches</h3>
        <Paper id="content">
          <Table style={tableStyle} fixedHeader={fixedHeader} fixedFooter={fixedFooter} selectable={selectable} multiSelectable={multiSelectable}>
            <TableHeader displaySelectAll={showCheckboxes} adjustForCheckbox={showCheckboxes} enableSelectAll={enableSelectAll}>
              <TableRow>
                <TableHeaderColumn>Fichenummer</TableHeaderColumn>
                <TableHeaderColumn>Datum</TableHeaderColumn>
                <TableHeaderColumn>Districtsnummer</TableHeaderColumn>
                <TableHeaderColumn>P. coördinator</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={showCheckboxes} deselectOnClickaway={deselectOnClickaway} showRowHover={showRowHover} stripedRows={stripedRows}>
              <TableRow>
                <TableRowColumn>FA215147</TableRowColumn>
                <TableRowColumn>01/06/2017</TableRowColumn>
                <TableRowColumn>1M3D8EA</TableRowColumn>
                <TableRowColumn>Anita Wuyts</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>FA215147</TableRowColumn>
                <TableRowColumn>01/06/2017</TableRowColumn>
                <TableRowColumn>1M3D8EA</TableRowColumn>
                <TableRowColumn>Anita Wuyts</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>FA215147</TableRowColumn>
                <TableRowColumn>01/06/2017</TableRowColumn>
                <TableRowColumn>1M3D8EA</TableRowColumn>
                <TableRowColumn>Anita Wuyts</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>FA215147</TableRowColumn>
                <TableRowColumn>01/06/2017</TableRowColumn>
                <TableRowColumn>1M3D8EA</TableRowColumn>
                <TableRowColumn>Anita Wuyts</TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}
MijnFiches.propTypes = {
  fiches: PropTypes.array.isRequired,
  currentUser: PropTypes.object,
};

export default createContainer(() => {
  Meteor.subscribe('fiches');

  return {
    fiches: Fiches.find({}, { sort: { createdAt: -1 } }).fetch(),
    currentUser: Meteor.user(),
  };
}, MijnFiches);
