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
    maxWidth: '170pt', marginBottom: '8pt'
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
export default class Vaststelling extends Component {
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
      <section id="vaststellingen" className={this.props.className}>
        <div style={{display:"inline-block"}}>
          <TimePicker floatingLabelStyle={floatingLabelColor} format="24hr" hintText="Uur ter plaatse" name="terPlaatse" floatingLabelText="Uur ter plaatse"  onChange={this.handleChangeTime} />
        </div>
        <div style={{display:"inline-block"}}>
          <TimePicker floatingLabelStyle={floatingLabelColor} format="24hr" hintText="Uur einde" name="uurEinde" floatingLabelText="Uur einde"  onChange={this.handleChangeTime} />
        </div>
        <h5>Aanwezig ter plaatse</h5>
        <div style={{display:'flex', flexWrap: 'wrap', alignItems:'flex-end'}}>
          <Checkbox label="Federale Politie" style={styles.checkbox} />
          <Checkbox label="Brandweer" style={styles.checkbox} />
          <Checkbox label="FAST / Takeldienst" style={styles.checkbox} />
          <Checkbox label="Civiele Bescherming" style={styles.checkbox} />
          <Checkbox label="Andere" style={styles.checkbox} />
            <TextField
              floatingLabelStyle={floatingLabelColor}
              floatingLabelText="Andere"
              name="aanwezigAndere"
            />
        </div>
        <div>
          <TextField
            floatingLabelText="Opmerkingen"
            multiLine={true}
            rows={3}
            name="Opmerkingen"
            style={{minWidth:"512px", maxWidth:"80%"}}
            floatingLabelStyle={floatingLabelColor}
          />
        </div>
        <h5>Incident / Schade</h5>
        <div style={{display:'flex', flexWrap: 'wrap', alignItems:'flex-end'}}>
          <Checkbox label="Put in rijbaan" style={styles.checkbox} />
          <Checkbox label="Signalisatie" style={styles.checkbox} />
          <Checkbox label="Boom/Struik" style={styles.checkbox} />
          <Checkbox label="Kunstwerk" style={styles.checkbox} />
          <Checkbox label="Verzakking" style={styles.checkbox} />
          <Checkbox label="Opstuikingk" style={styles.checkbox} />
          <Checkbox label="Met. vangrail" style={styles.checkbox} />
          <Checkbox label="Andere" style={styles.checkbox} />
          <TextField
            floatingLabelStyle={floatingLabelColor}
            floatingLabelText="Andere"
            name="aanwezigAndere"
          />
        </div>
        <div style={{display:'flex', alignItems:'flex-end'}}>
          <Checkbox label="Wateroverlast" style={styles.checkbox} />
          <TextField
            floatingLabelStyle={floatingLabelColor}
            floatingLabelText="Omschrijving wateroverlast"
            name="aanwezigAndere"
          />
        </div>
        <div style={{display:'flex', alignItems:'flex-end'}}>
          <Checkbox label="Stormschade" style={styles.checkbox} />
          <TextField
            floatingLabelStyle={floatingLabelColor}
            floatingLabelText="Omschrijving Stormschade"
            name="aanwezigAndere"
          />
        </div>
        <div>
          <Checkbox label="Ongeval" style={styles.checkbox} />
        </div>
        <div style={{display:'flex', flexWrap: 'wrap', alignItems:'flex-end'}}>
          <Checkbox label="Met. stootb." style={styles.checkbox} />
          <Checkbox label="Bet. stootb." style={styles.checkbox} />
          <Checkbox label="Signalisatie " style={styles.checkbox} />
          <Checkbox label="Elektrische Installatie " style={styles.checkbox} />
          <Checkbox label="Boom/Struik " style={styles.checkbox} />
          <Checkbox label="Kunstwerk." style={styles.checkbox} />
          <Checkbox label="Berm/talut" style={styles.checkbox} />
          <Checkbox label="Wegdek " style={styles.checkbox} />
          <Checkbox label="Bijstand brand" style={styles.checkbox} />
          <Checkbox label="Andere" style={styles.checkbox} />
          <TextField
            floatingLabelStyle={floatingLabelColor}
            floatingLabelText="Andere"
            name="aanwezigAndere"
          />
        </div>
        <div style={{display:'flex', alignItems:'flex-end'}}>
          <Checkbox label="Ladingverlies" style={styles.checkbox} />
          <TextField
            floatingLabelStyle={floatingLabelColor}
            floatingLabelText="Omschrijving Ladingverlies"
            name="aanwezigAndere"
          />
        </div>
        <div style={{display:'flex', alignItems:'flex-end'}}>
          <Checkbox label="Bodemverontreiniging" style={styles.checkbox} />
          <TextField
            floatingLabelStyle={floatingLabelColor}
            floatingLabelText="Omschrijving Bodemverontreiniging"
            name="aanwezigAndere"
          />
        </div>
      </section>
    );
  }
}
