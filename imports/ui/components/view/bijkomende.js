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

const itemStyle = {margin:'15px 0px 6px 0px'};
const textStyle = {whiteSpace: 'pre-line'};
export default class BijkomendeView extends Component {
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
        <div style={itemStyle}>Bijkomende Details Vaststellingen - Acties - Uitvoering - ...:</div>
        <div style={textStyle}><strong>{fiche.text}</strong></div>
      </div>
    );
  }
}
