import { Mongo } from 'meteor/mongo';

export const Personeelsleden = new Mongo.Collection('personeelsledens');

if (Meteor.isServer) {
  Meteor.publish('personeelsleden', function tasksPublication() {
    return Personeelsleden.find({});
  });
}
