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
export default class Beslissing extends Component {
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
        <div style={{fontSize: "0.83em", fontWeight: "bold"}}>Oproep aan</div>
        <div style={{display:'flex', flexWrap: 'wrap', alignItems:'flex-end'}}>
          <Checkbox label="Regie" style={styles.checkbox} />
          <TimePicker floatingLabelStyle={floatingLabelColor} format="24hr" hintText="Uur oproep" name="terPlaatse" floatingLabelText="Uur oproep"  onChange={this.handleChangeTime} />
          <Checkbox label="Na oproep" style={styles.checkbox} />
          <Checkbox label="Na vaststellingen" style={styles.checkbox} />
        </div>
        <div >
          <div style={{display:'flex', flexWrap: 'wrap', alignItems:'flex-end'}}>
            <Checkbox label="Aannemer" style={styles.checkbox} />
            <TimePicker floatingLabelStyle={floatingLabelColor} format="24hr" hintText="Uur oproep" name="terPlaatse" floatingLabelText="Uur oproep"  onChange={this.handleChangeTime} />
            <TextField
              floatingLabelStyle={floatingLabelColor}
              floatingLabelText="Naam aannemer"
              name="aanwezigAndere"
            />
          </div>
          <div style={{marginLeft:"225px", display:'flex', flexWrap: 'wrap', alignItems:'flex-end'}}>
            <Checkbox label="Na oproep" style={{maxWidth:'256px', marginBottom: '8pt'}} />
            <Checkbox label="Na vaststellingen" style={styles.checkbox} />
          </div>
        </div>
        <div style={{display:'flex', flexWrap: 'wrap', alignItems:'flex-end'}}>
          <Checkbox label="Signalisatie" style={styles.checkbox} />
          <TimePicker floatingLabelStyle={floatingLabelColor} format="24hr" hintText="Uur oproep" name="terPlaatse" floatingLabelText="Uur oproep"  onChange={this.handleChangeTime} />
          <Checkbox label="Botsers Bestek" style={styles.checkbox} />
          <Checkbox label="Aannemer" style={styles.checkbox} />
        </div>
        <div style={{display:'flex', flexWrap: 'wrap', alignItems:'flex-end'}}>
          <Checkbox label="Bodemdeskundige" style={styles.checkbox} />
          <TimePicker floatingLabelStyle={floatingLabelColor} format="24hr" hintText="Uur oproep" name="terPlaatse" floatingLabelText="Uur oproep"  onChange={this.handleChangeTime} />
          <TextField
            floatingLabelStyle={floatingLabelColor}
            floatingLabelText="Naam Bodemdeskundige"
            name="aanwezigAndere"
          />
        </div>
        <div>
          <Checkbox label="Politie" style={styles.checkbox} />
          <Checkbox label="Brandweer" style={styles.checkbox} />
          <Checkbox label="Civiele Bescherming" style={styles.checkbox} />
          <Checkbox label="FAST/Takeldienste" style={styles.checkbox} />
        </div>
        <h5>Kennisgave Aan</h5>
          <div style={{display:'flex', flexWrap: 'wrap', alignItems:'flex-end'}}>
            <Checkbox label="VVC" style={styles.checkbox} />
            <Checkbox label="VTC" style={styles.checkbox} />
            <Checkbox label="Politie" style={styles.checkbox} />
            <Checkbox label="Andere" style={styles.checkbox} />
          </div>
      </section>
    );
  }
}
