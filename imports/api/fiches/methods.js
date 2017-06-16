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
    data.bijkomde = {text: '', mode: 'edit'};
    data.vastellingen = {
      andereAanwezig: false,
      andereAanwezigTekst: "",
      andereIncident: false,
      andereIncidentTekst: "",
      andereOngeval: false,
      andereOngevalTekst: "",
      bermTalut: false,
      betStootb: false,
      bijstandBrand: false,
      bodemverontreiniging: false,
      bodemverontreinigingTekst: "",
      boomStruikIncident: false,
      boomStruikOngeval: false,
      brandweer: false,
      civieleBescherming: false,
      electrischeInstallatie: false,
      fast: false,
      federalePolitie: false,
      kunstwerk: false,
      kunstwerkOngeval: false,
      ladingverlies: false,
      ladingverliesTekst: "",
      metStootb: false,
      mode: 'edit',
      ongeval: false,
      opmerkingen: '',
      opstuiking: false,
      put: false,
      redirect: false,
      signalisatie: false,
      signalisatie2: false,
      stormschade: false,
      stormschadeTekst: "",
      verzakking: false,
      verzakking: false,
      vangrail: false,
      uurEinde: "",
      uurTerplaatse: "",
      wateroverlast: false,
      wateroverlastTekst: "",
      wegdek: false,
    }
    data.beslissingen= {
      aannemer: false,
      bodemdeskundige: false,
      BotsersBestek: false,
      brandweer: false,
      civieleBescherming: false,
      fast: false,
      kennisgaveAndere: false,
      kennisgaveAndereTekst: "",
      kennisgavePolitie: false,
      mode: "edit",
      naamAannemer: "",
      naamBodemdeskundig: "",
      naOproepAannemer: false,
      naOproepRegie: false,
      naVaststellingAannemer: false,
      naVaststellingRegie: false,
      politie: false,
      redirect: false,
      regie: false,
      signalisatie: false,
      signalisatieAannemer: false,
      uurOproepAannemer: null,
      uurOproepBodemdeskundige: null,
      uurOproepRegie: null,
      uurOproepSignalisatie: null,
      VVC: false,
      VTC: false,
    }
    return Fiches.insert({
      data,
      "createdAt": createdAt
    });
  },
  'fiches.update'(id, data) {
    d = new Date();
    var user = Meteor.user();
    data.updatedAt = d;
    data.updatedBy = user.username;
    return Fiches.update(id, {$set: data});
  },
});
