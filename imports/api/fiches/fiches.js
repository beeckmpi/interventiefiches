// Definition of the links collection

import { Mongo } from 'meteor/mongo';

export const Fiches = new Mongo.Collection('fiches');
if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('fiches', function tasksPublication() {
    return Fiches.find({});
  });
}
