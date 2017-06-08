// react imports
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { withRouter, Redirect } from 'react-router';
import createHistory from 'history/createBrowserHistory';
import moment from 'moment-es6';
import PropTypes from 'prop-types';

// material-ui imports
import {
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';;

export default class FicheRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
  }
  goToFiche = () => {
    this.setState({'redirect':true});
  }
  render() {
    const { fiche } = this.props;
     const { redirect } = this.state
    const location = {
      pathname: '/fiches/view/'+fiche._id
    }
    if (redirect){
      return (
          <Redirect to={location}/>
      )
    }
    return (
      <TableRow key={fiche._id} onClick={this.goToFiche}>
        <TableRowColumn>{fiche.data['fichenummer']}</TableRowColumn>
        <TableRowColumn>{moment(fiche.data['createdAt']).format('DD-MM-YYYY HH:mm')}</TableRowColumn>
        <TableRowColumn>{fiche.data['district']}</TableRowColumn>
        <TableRowColumn>{fiche.data['provinciaalCoordinator']}</TableRowColumn>
        <TableRowColumn>{fiche.data['status']}</TableRowColumn>
      </TableRow>
    );
  }
}
