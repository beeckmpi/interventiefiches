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
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import areIntlLocalesSupported from 'intl-locales-supported';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

let DateTimeFormat;
if (areIntlLocalesSupported(['nl', 'nl-BE'])) {
  DateTimeFormat = global.Intl.DateTimeFormat;
} else {
  const IntlPolyfill = require('intl');
  DateTimeFormat = IntlPolyfill.DateTimeFormat;
  require('intl/locale-data/jsonp/nl');
  require('intl/locale-data/jsonp/nl-BE');
}

export default class FicheToevoegen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opDatum: null,
      oproep: null,
      bijkomendeInformatie: "",
      provinciaalCoordinator: "",
      weg: "",
      grondgebied: "",
      rijrichting: "",
      deselectOnClickaway: true,
      showCheckboxes: false,
      height: '300px',
    };
  }
  handleChangeDate = (event, date) => {
    this.setState({
      "opDatum": date,
    });
  };
  handleChangeTime = (event, date) => {
    console.log(event);
    this.setState({"oproep": date});
  };
  handleChange = (event) => this.setState({[event.target.name]: event.target.value});

  render() {
    const {opDatum, oproep, bijkomendeInformatie, provinciaalCoordinator, weg, grondgebied, rijrichting, showRowHover, stripedRows} = this.state;
    return (
      <div className="container" style={{margin:"10px 0px 40px 230px"}}>
        <h3 style={{color:"#fff", marginLeft:"30px"}}>Fiche Toevoegen</h3>
        <Paper id="content" style={{paddingLeft:"15px"}}>
          <div style={{display:"inline-block"}}>
            <DatePicker hintText="Op datum" locale="nl"  DateTimeFormat={Intl.DateTimeFormat} floatingLabelText="Op (Datum)" value={opDatum} name="opDatum" onChange={this.handleChangeDate}  mode="landscape" />
          </div>
          <div style={{display:"inline-block"}}>
            <TimePicker format="24hr" hintText="Oproep" name="oproep" floatingLabelText="Oproep"  onChange={this.handleChangeTime} />
          </div>
          <div>
            <TextField
              hintText="Bijkomende Informatie"
              floatingLabelText="Bijkomende Informatie"
              multiLine={true}
              rows={2}
              name="bijkomendeInformatie"
              onChange={this.handleChange}
              value={bijkomendeInformatie}
              style={{minWidth:"50%", maxWidth:"80%"}}
            />
          </div>
          <div>
            <TextField
              hintText="Provinciaal coördinator"
              floatingLabelText="Provinciaal coördinator"
              name="provinciaalCoordinator"
              onChange={this.handleChange}
              value={provinciaalCoordinator}
            />
          </div>
          <div>
            <TextField
              hintText="Weg"
              floatingLabelText="Weg"
              name="weg"
              onChange={this.handleChange}
              value={weg}
            />
          </div>
          <div>
            <TextField
              hintText="Grondgebied (Gemeente of Postcode)"
              floatingLabelText="Grondgebied"
              name="grondgebied"
              onChange={this.handleChange}
              value={grondgebied}
            />
          </div>
          <div>
            <TextField
              hintText="Rijrichting"
              floatingLabelText="Rijrichting"
              name="rijrichting"
              onChange={this.handleChange}
              value={rijrichting}
            />
          </div>
        </Paper>
      </div>
    );
  }
}
FicheToevoegen.propTypes = {
};
