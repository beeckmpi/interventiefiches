// react imports
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { withRouter, Redirect } from 'react-router';
import createHistory from 'history/createBrowserHistory';
import moment from 'moment-es6';
import PropTypes from 'prop-types';

import areIntlLocalesSupported from 'intl-locales-supported';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import TimePicker from 'material-ui/TimePicker';
import Checkbox from 'material-ui/Checkbox';

const floatingLabelColor = {
  color: "#757575"
}
const styles = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    maxWidth: '170pt',
    marginBottom: '8pt'
  },
};
//locales
let DateTimeFormat;
if (areIntlLocalesSupported(['nl', 'nl-BE'])) {
  DateTimeFormat = global.Intl.DateTimeFormat;
} else {
  const IntlPolyfill = require('intl');
  DateTimeFormat = IntlPolyfill.DateTimeFormat;
  require('intl/locale-data/jsonp/nl');
  require('intl/locale-data/jsonp/nl-BE');
}
export default class Tijdstippen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
  }
  handleChangeTime = (event, date) => this.setState({"oproep": date});

  render() {
    const { fiche } = this.props;

    return (
      <section id="beslissing">
        <div style={{fontSize: "0.83em", fontWeight: "bold"}}></div>
        <div style={{width: '200px', fontWeight: "bold"}}>Regie ter plaatse:</div>
        <div style={{display:'flex', flexWrap: 'wrap', alignItems:'flex-end'}}>
          <TimePicker floatingLabelStyle={floatingLabelColor} format="24hr" hintText="Van" name="regieVan" floatingLabelText="Van" />
          <TimePicker floatingLabelStyle={floatingLabelColor} format="24hr" hintText="Tot" name="regieTot" floatingLabelText="Tot" />
          <TextField floatingLabelStyle={floatingLabelColor} floatingLabelText="Regie arbeider" type="number" name="rArbeiders" />
        </div>
        <div style={{width: '200px', fontWeight: "bold"}}>Aannemer ter plaatse:</div>
        <div style={{display:'flex', flexWrap: 'wrap', alignItems:'flex-end'}}>
          <TimePicker floatingLabelStyle={floatingLabelColor} format="24hr" hintText="Van" name="regieVan" floatingLabelText="Van" />
          <TimePicker floatingLabelStyle={floatingLabelColor} format="24hr" hintText="Tot" name="regieTot" floatingLabelText="Tot" />
          <TextField floatingLabelStyle={floatingLabelColor} floatingLabelText="Regie toezichter" type="text" name="rToezichter" />
        </div>
        <div style={{width: '200px', fontWeight: "bold"}}>Signalisatie ter plaatse:</div>
        <div style={{display:'flex', flexWrap: 'wrap', alignItems:'flex-end'}}>
          <TimePicker floatingLabelStyle={floatingLabelColor} format="24hr" hintText="Van" name="regieVan" floatingLabelText="Van" />
          <TimePicker floatingLabelStyle={floatingLabelColor} format="24hr" hintText="Tot" name="regieTot" floatingLabelText="Tot" />
          <TextField floatingLabelStyle={floatingLabelColor} floatingLabelText="Aantal Botsers" type="number" name="rToezichter" />
        </div>
        <div style={{width: '200px', fontWeight: "bold"}}>Deskundige ter plaatse:</div>
        <div style={{display:'flex', flexWrap: 'wrap', alignItems:'flex-end'}}>
          <TimePicker floatingLabelStyle={floatingLabelColor} format="24hr" hintText="Van" name="regieVan" floatingLabelText="Van" />
          <TimePicker floatingLabelStyle={floatingLabelColor} format="24hr" hintText="Tot" name="regieTot" floatingLabelText="Tot" />
          <TextField floatingLabelStyle={floatingLabelColor} floatingLabelText="Deskundige" type="text" name="rToezichter" />
        </div>
        <div style={{width: '200px', fontWeight: "bold", paddingBottom: '10px'}}>Ondernomen actie:</div>
        <div style={{display:'flex', flexWrap: 'wrap', alignItems:'flex-end'}}>
          <Checkbox label="Afgraving" style={styles.checkbox} />
          <Checkbox label="Ontstoppen riolering" style={styles.checkbox} />
          <Checkbox label="Reinigen wegdek" style={styles.checkbox} />
          <Checkbox label="V. / A. stootbanden" style={styles.checkbox} />
          <Checkbox label="Vullen put" style={styles.checkbox} />
          <Checkbox label="Andere" style={styles.checkbox} />
        </div>
        <TextField
          floatingLabelText="Opmerkingen"
          multiLine={true}
          rows={3}
          name="Opmerkingen"
          style={{minWidth:"512px", maxWidth:"80%"}}
          floatingLabelStyle={floatingLabelColor}
        />
      </section>
    );
  }
}
