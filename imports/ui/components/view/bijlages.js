// react imports
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { withRouter, Redirect } from 'react-router';
import createHistory from 'history/createBrowserHistory';
import moment from 'moment-es6';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';

import Dropzone from 'react-dropzone';
import RaisedButton from 'material-ui/RaisedButton';
import Images from '../../../api/files/files.js';
import IndividualFile from '../individualFile.js';

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
  largeImage: {maxWidth: "60%", maxHeight: "100%", height: "auto"}
};
const customContentStyle = {
  width: '80%',
  height: '80%',
  maxWidth: 'none',
};
export default class BijlagesView extends Component {
  constructor(props) {
    super(props);
    this.data = {};
    this.state = {

    };
  }
  showUploadedFiles = () => {
    const { imageFiles } = this.props;
    if(imageFiles!=undefined) {
      return imageFiles.map((image, key) => (
        <IndividualFile key={key} image={image} />
      ));
    }
  }
  render() {
    const { data, fiche } = this.props;
    return (
      <div>
        <div style={{display: "flex",flexWrap: "wrap", marginLeft: "20pt"}}>
          {this.showUploadedFiles()}
        </div>
      </div>
    );
  }
}
