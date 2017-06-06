// Methods related to links

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Fiches } from './fiches.js';

Meteor.methods({
  'fiches.insert'(data) {
    return Fiches.insert({
      data,
      createdAt: new Date(),
    });
  },
});
