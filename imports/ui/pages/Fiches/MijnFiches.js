// react imports
import React, { Component } from 'react';
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

export default class MijnFiches extends Component {
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
};
