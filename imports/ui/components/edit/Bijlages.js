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
export default class Bijlages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      open: false,
      files: {},
      activeId: '',
    };
  }
  getInitialState = () => {
    return {
      uploading: [],
      progress: 0,
      inProgress: false
    }
  }
  uploadIt = (acceptedFiles, rejectedFiles) => {
   "use strict";
   let self = this;
   const ficheID = this.props.ficheId;
   if (acceptedFiles && acceptedFiles[0]) {
     // We upload only one file, in case
     // there was multiple files selected
     var file = acceptedFiles[0];

     if (file) {
       let uploadInstance = Images.insert({
         file: file,
         meta: {
           ficheId: ficheID,
           locator: self.props.fileLocator,
           userId: Meteor.userId() // Optional, used to check on server for file tampering
         },
         streams: 'dynamic',
         chunkSize: 'dynamic',
         allowWebWorkers: true // If you see issues with uploads, change this to false
       }, false);

       self.setState({
         uploading: uploadInstance, // Keep track of this instance to use below
         inProgress: true // Show the progress bar now
       });

       // These are the event functions, don't need most of them, it shows where we are in the process
       uploadInstance.on('start', function () {
         console.log('Starting');
       });

       uploadInstance.on('end', function (error, fileObj) {
         console.log('On end File Object: ', fileObj);
       });

       uploadInstance.on('uploaded', function (error, fileObj) {
         if (error) {
          alert('Error during upload: ' + error);
        } else {
         console.log('uploaded: ', fileObj);
         console.log(fileObj._id);
         let fileInfo = {'_id': fileObj._id, 'name': fileObj.name, 'ext': fileObj.ext}
         let dataImport = {'files': fileInfo};
         console.log(dataImport);
         Meteor.call('fiches.addToSet', ficheID, dataImport);
         // Reset our state for the next file
         self.setState({
           uploading: [],
           progress: 0,
           inProgress: false
         });
       }
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

       uploadInstance.start(); // Must manually start the upload
     }
   }
 }

 // This is our progress bar, bootstrap styled
 // Remove this function if not needed
 showUploads = () => {
   if (!_.isEmpty(this.state.uploading)) {
      console.log('**********************************', this.state.uploading);
     return (<div>
       {this.state.uploading.file.name}

       <div className="progress progress-bar-default">
         <div style={{width: this.state.progress + '%'}} aria-valuemax="100"
            aria-valuemin="0"
            aria-valuenow={this.state.progress || 0} role="progressbar"
            className="progress-bar">
           <span className="sr-only">{this.state.progress}% Complete (success)</span>
           <span>{this.state.progress}%</span>
         </div>
       </div>
     </div>);
   }
 }
 showUploadedFiles = () => {
   const { imageFiles } = this.props;
   return imageFiles.map((image, key) => (
     <IndividualFile key={key} image={image} />
   ));
 }
 render() {
   if (!this.props.docsReadyYet) {
     'use strict';

     return (
       <div>
         <div style={{marginBottom: "20pt"}}>
           <Dropzone ref="dropzone" onDrop={this.uploadIt} style={{display: 'inherit', position: "relative", float:"left"}}>
             <div style={{borderColor:"#666",borderRadius:5,borderStyle:"dashed",borderWidth:2,height:"200pt",width:"200pt", position:"relative", verticalAlign:"middle"}}>
               <div style={{padding: "90pt 5pt", textAlign:"center"}}>Sleep bestanden hierin of klik hier om bestanden toe te voegen.</div>
             </div>
           </Dropzone>
           <div style={{display: "flex",flexWrap: "wrap", marginLeft: "20pt"}}>
             {this.showUploadedFiles()}
           </div>
         </div>
       {this.showUploads()}
       <Dialog
          modal={true}
          contentStyle={customContentStyle}
          open={this.state.open}
        >
          <img  src={"/cdn/storage/Images/"+this.state.activeId+"/original/"+this.state.activeId+".png"} style={styles.largeImage} />
        </Dialog>
       </div>
     );
   }
   else return <div></div>
 }
}
