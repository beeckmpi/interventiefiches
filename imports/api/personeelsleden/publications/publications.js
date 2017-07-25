// All links-related publications

import { Meteor } from 'meteor/meteor';
import { Personeelsleden } from '../personeelsleden.js';

Meteor.publish('personeelsleden.all', function () {
  return Personeelsleden.find();
});
