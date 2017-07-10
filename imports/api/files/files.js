import { Meteor }          from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';

import Grid from 'gridfs-stream'; // We'll use this package to work with GridFS
import fs from 'fs';              // Required to read files initially uploaded via Meteor-Files
import { MongoInternals } from 'meteor/mongo';

// Set up gfs instance
let gfs;
if (Meteor.isServer) {
  gfs = Grid(
    MongoInternals.defaultRemoteCollectionDriver().mongo.db,
    MongoInternals.NpmModule
  );
}

const Images = new FilesCollection({
  collectionName: 'Images',
  allowClientCode: false, // Disallow remove files from Client
  debug: Meteor.isServer && process.env.NODE_ENV === 'development',
  onBeforeUpload(file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= 16485760 && /png|jpg|jpeg/i.test(file.extension)) {
      return true;
    } else {
      return 'Please upload image, with size equal or less than 15MB';
    }
  },
  onAfterUpload(image) {
    // Move file to GridFS
    Object.keys(image.versions).forEach(versionName => {
      const metadata = { versionName, imageId: image._id, storedAt: new Date() }; // Optional
      const writeStream = gfs.createWriteStream({ filename: image.name, metadata });

      fs.createReadStream(image.versions[versionName].path).pipe(writeStream);

      writeStream.on('close', Meteor.bindEnvironment(file => {
        const property = `versions.${versionName}.meta.gridFsFileId`;

        // If we store the ObjectID itself, Meteor (EJSON?) seems to convert it to a
        // LocalCollection.ObjectID, which GFS doesn't understand.
        this.collection.update(image._id, { $set: { [property]: file._id.toString() } });
        this.unlink(this.collection.findOne(image._id), versionName); // Unlink files from FS
      }));
    });
  },
  interceptDownload(http, image, versionName) {
    // Serve file from GridFS
    const _id = (image.versions[versionName].meta || {}).gridFsFileId;
    if (_id) {
      const readStream = gfs.createReadStream({ _id });
      readStream.on('error', err => { throw err; });
      readStream.pipe(http.response);
    }
    return Boolean(_id); // Serve file from either GridFS or FS if it wasn't uploaded yet
  },
  onAfterRemove(images) {
    // Remove corresponding file from GridFS
    images.forEach(image => {
      Object.keys(image.versions).forEach(versionName => {
        const _id = (image.versions[versionName].meta || {}).gridFsFileId;
        if (_id) gfs.remove({ _id }, err => { if (err) throw err; });
      });
    });
  }
});

if (Meteor.isClient) {
  Meteor.subscribe('files.images.all');
}

if (Meteor.isServer) {
  Images.denyClient();
  Meteor.publish('files.images.all', function () {
    return Images.find().cursor;
  });
  Images.allow({
    insert: function() {
      return true;
    },
    update: function() {
      return true;
    },
    remove: function() {
      return true;
    }
  });
}

export default Images;
