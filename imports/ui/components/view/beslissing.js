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
import VaststellingVIew from '../view/vaststelling';

const itemStyle = {margin:'15px 0px 6px 0px'};
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
export default class BeslissingView extends Component {
  constructor(props) {
    super(props);
    this.data = {};
    this.state = {

    };
  }
  renderKennisgaveAnderItems(){
    return Object.keys(this.props.fiche.kennisgaveAndere).map((key, bool) => (
      this.props.fiche.kennisgaveAndere[key] ? <li key={key}><strong>{key}</strong></li> : ''
    ));
  }
  render() {
    const { data, fiche } = this.props;
    return (
      <div>
        {fiche.regie ?
            <p>De regie werd opgeroepen op <strong>{moment(fiche.uurOproepRegie).format('HH:MM')}</strong>.</p>
            : '' }
        {fiche.aannemer ?
          <p>De aannemer (<strong>{fiche.naamAannemer}</strong>)  werd opgeroepen op <strong>{moment(fiche.uurOproepAannemer).format('HH:MM')}</strong>.</p>
        : '' }
        {fiche.signalisatie ?
            <p>De signalisatie werd opgeroepen op <strong>{moment(fiche.uurOproepSignalisatie).format('HH:MM')}</strong>, de kost van de signalisatie zit bij <strong>{fiche.BotsersBestek ? 'het botsers bestek': ''} {fiche.signalisatieAannemer ? 'de aannemer': ''}</strong>.</p>
            : '' }
        {fiche.bodemdeskundige ?
          <p>De bodemdeskundige (<strong>{fiche.bodemdeskundige}</strong>)  werd opgeroepen op <strong>{moment(fiche.uurOproepAannemer).format('HH:MM')}</strong>.</p>
        : '' }
        <p>De volgende diensten werden opgeroepen:</p>
        <ul>
          {fiche.politie ? <li><strong>Politie</strong></li> : ''}
          {fiche.brandweer ? <li><strong>Brandweer</strong></li> : ''}
          {fiche.civieleBescherming ? <li><strong>Civiele Bescherming</strong></li> : ''}
          {fiche.fast ? <li><strong>FAST/Takeldiensten</strong></li> : ''}
        </ul>
        <p>De volgende diensten werden in kennis gesteld:</p>
        <ul>
          {fiche.VVC ? <li><strong>VVC</strong></li> : ''}
          {fiche.VTC ? <li><strong>VTC</strong></li> : ''}
          {fiche.kennisgavePolitie ? <li><strong>Politie</strong></li> : ''}
          {this.renderKennisgaveAnderItems()}
        </ul>
      </div>
    );
  }
}
