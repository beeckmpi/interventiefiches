// Methods related to links

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Fiches } from './fiches.js';
import moment from 'moment-es6';

Meteor.methods({
  'fiches.insert'(data) {
    d = new Date();
    var user = Meteor.user();
  	createdAt = d;
  	data.username = user.username;
    data.fichenummer = d.getFullYear()+'/'+data.district+'/'+moment().format("DDMM-HHmm");
    data.status = "Doorgezonden";
    return Fiches.insert({
      data,
      "createdAt": createdAt
    });
  },
});
