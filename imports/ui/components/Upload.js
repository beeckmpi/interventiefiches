// react imports
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { withRouter, Redirect } from 'react-router';
import createHistory from 'history/createBrowserHistory';
import moment from 'moment-es6';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Dropzone from 'react-dropzone'

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
  }
  handleUpload = (files) => {
    files.map((file) => {
      console.log(file);
      let uploadInstance = UserFiles.insert({
        file: file,
        meta: {
          locator: self.props.fileLocator,
          userId: Meteor.userId() // Optional, used to check on server for file tampering
        },
        streams: 'dynamic',
        chunkSize: 'dynamic',
        allowWebWorkers: true // If you see issues with uploads, change this to false
      }, false);

      uploadInstance.on('start', function () {
        console.log('Starting');
      });

      uploadInstance.on('end', function (error, fileObj) {
        console.log('On end File Object: ', fileObj);
      });

      uploadInstance.on('error', function (error, fileObj) {
        console.log('Error during upload: ' + error);
      });

      uploadInstance.on('progress', function (progress, fileObj) {
        console.log('Upload Percentage: ' + progress);
        // Update our progress bar
        self.setState({
          progress: progress
        })
      });
      uploadInstance.start();
    });
  }

  render() {
    const { fiche } = this.props;

    return (
      <section id="Upload">
        <Dropzone onDrop={this.handleUpload} style={{minHeight: '200pt', maxWidth: '200pt', padding:"25px 25px",  border: "5px dashed #555"}}>
          <div>Sleep bestanden naar hier of klik hier om bestanden toe tevoegen.</div>
        </Dropzone>
      </section>
    );
  }
}
