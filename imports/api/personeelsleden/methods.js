// Methods related to links

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Personeelsleden } from './personeelsleden.js';
import moment from 'moment-es6';

Meteor.methods({
  'personeelsleden.insert'(data) {
    d = new Date();
    var user = Meteor.user();
  	createdAt = d;

    return Personeelsleden.insert({
      data,
      "createdAt": createdAt
    });
  },
  'personeelsleden.update'(id, data) {
    d = new Date();
    var user = Meteor.user();
    data.updatedAt = d;
    data.updatedBy = user.username;
    return Personeelsleden.update(id, {$set: data});
  },
  'personeelsleden.addToSet'(id, data) {
    d = new Date();
    var user = Meteor.user();
    data.updatedAt = d;
    data.updatedBy = user.username;
    return Personeelsleden.update(id, {$addToSet: data});
  },
  'personeelsleden.push'(id, data) {
    d = new Date();
    var user = Meteor.user();
    data.updatedAt = d;
    data.updatedBy = user.username;
    return Personeelsleden.update(id, {$push: data});
  },
});
