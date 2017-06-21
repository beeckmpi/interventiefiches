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
const textStyle = {whiteSpace: 'pre-line'};
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
export default class TijdstippenView extends Component {
  constructor(props) {
    super(props);
    this.data = {};
    this.state = {

    };
  }
  render() {
    const { data, fiche } = this.props;
    return (
      <div>
        {fiche.vanRegie ?
            <div>
              De {(fiche.regieArbeider == 1) ? <strong>arbeider</strong> : <strong>{fiche.regieArbeider} arbeiders</strong>} van de regie waren ter plaatse van <strong>{moment(fiche.vanRegie).format('HH:MM')}</strong> tot <strong>{moment(fiche.totRegie).format('HH:MM')}</strong>.
            </div>
        : '' }
        {fiche.vanAannemer ?
            <div>
              De aannemer was ter plaatse van <strong>{moment(fiche.vanAannemer).format('HH:MM')}</strong> tot <strong>{moment(fiche.totAanemer).format('HH:MM')}</strong> onder toezicht van <strong>{fiche.regieToezichter}</strong>.
            </div>
        : '' }
        {fiche.vanSignalisatie ?
            <div>
              De signalisatie was ter plaatse van <strong>{moment(fiche.vanSignalisatie).format('HH:MM')}</strong> tot <strong>{moment(fiche.totSignalisatie).format('HH:MM')}</strong> er {(fiche.aantalBotsers == 1) ? <strong>was 1 botser</strong> : <strong> waren {fiche.aantalBotsers} botsers</strong>}.
            </div>
        : '' }
        {fiche.vanDeskundige ?
            <div>
              De deskundige <strong>({fiche.naamDeskundige})</strong> was ter plaatse van <strong>{moment(fiche.vanDeskundige).format('HH:MM')}</strong> tot <strong>{moment(fiche.totDeskundige).format('HH:MM')}</strong>.
            </div>
        : '' }
        <p>De volgende actie(s) werd(en) ondernomen:</p>
        <ul>
          {fiche.afgraving ? <li><strong>Afgraving</strong></li> : ''}
          {fiche.ontstoppen ? <li><strong>Ontstoppen riolering</strong></li> : ''}
          {fiche.reinigen ? <li><strong>Reinigen wegdek</strong></li> : ''}
          {fiche.vaStootbanden ? <li><strong>V. / A. stootbanden</strong></li> : ''}
          {fiche.vullenPut ? <li><strong>Vullen put</strong></li> : ''}
          {fiche.andere ? <li><strong>{fiche.andereTekst}</strong></li> : ''}
        </ul>
        <div>Opmerkingen:</div>
        <div style={textStyle}><strong>{fiche.opmerkingen}</strong></div>
      </div>
    );
  }
}
