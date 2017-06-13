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

const itemStyle = {fontSize:"smaller", margin:'15px 0px 6px 0px'};
const floatingLabelColor = { color: "#757575"}
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
export default class Provinciaal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
  }
  render() {
    const { fiche } = this.props;
    return (
      <section id="provinciaal" className={this.props.className}>
        <div style={{display:"inline-block"}}>
          De oproep kwam binnen op <strong>{moment(fiche.data.opDatum).format('DD-MM-YYYY')} {moment(fiche.data.oproep).format('HH:MM')}</strong> en werd ontvangen door <strong>{fiche.data.provinciaalCoordinator}</strong>.
        </div>
        <div>
          <div style={itemStyle}>Bijkomende informatie:</div>
          {fiche.data.bijkomendeInformatie}
        </div>
        <div>
          <div style={itemStyle}>District:</div>
          <strong> {fiche.data.district}</strong>
        </div>
        <div>
          <div style={itemStyle}>Doorgegeven aan:</div>
          <strong>{fiche.data.doorgegevenAan}</strong>
        </div>
        <div>
          <div style={itemStyle}>Oproep door:</div>
          {fiche.data.oproepDoor=="Andere" &&
            <div><strong>{fiche.data.andereOproep}</strong></div>
          }
          {fiche.data.oproepDoor!="Andere" &&
            <div><strong>{fiche.data.oproepDoor}</strong></div>
          }
        </div>
        <div>
          <div style={itemStyle}>Melding:</div>
          {fiche.data.melding=="Andere" &&
            <div><strong>{fiche.data.andereMelding}</strong></div>
          }
          {fiche.data.melding!="Andere" &&
            <div><strong>{fiche.data.melding}</strong></div>
          }
        </div>
        <div>
          <div style={itemStyle}>Locatie:</div>
          {fiche.data.weg!="" &&
            <div>Op de <strong>{fiche.data.weg}</strong> in <strong>{fiche.data.grondgebied}</strong> richting <strong>{fiche.data.rijrichting}</strong></div>
          }
          {fiche.data.gewestweg!="" &&
            <div>Op de <strong>{fiche.data.gewestweg}</strong>  richting <strong>{fiche.data.richting}</strong></div>
          }
          {fiche.data.kmPuntVan!="" &&
            <div>Van kilometerpunt <strong>{fiche.data.kmPuntVan}</strong> tot kilometerpunt <strong>{fiche.data.kmPuntTot}</strong></div>
          }
          {fiche.data.straat!="" &&
            <div>In de <strong>{fiche.data.straat}</strong>, nummer <strong>{fiche.data.huisnummer}</strong></div>
          }
        </div>
        {fiche.data.opmerkingBereikbaarheid!="" &&
          <div>
            <div style={itemStyle}>Opmerking bereikbaarheid:</div>
            <div>{fiche.data.opmerkingBereikbaarheid}</div>
          </div>
        }
      </section>
    );
  }
}
