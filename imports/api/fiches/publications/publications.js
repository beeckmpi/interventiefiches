// All links-related publications

import { Meteor } from 'meteor/meteor';
import { Fiches } from '../fiches.js';

Meteor.publish('fiches.all', function () {
  return Fiches.find();
});
