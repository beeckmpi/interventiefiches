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
    const bijkomende = {text: '', mode: 'edit'};
    const vaststellingen = {
      andereAanwezig: {},
      andereAanwezigTekst: "",
      andereIncident: {},
      andereIncidentTekst: "",
      andereOngeval: {},
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
     const beslissingen = {
      aannemer: false,
      bodemdeskundige: false,
      BotsersBestek: false,
      brandweer: false,
      civieleBescherming: false,
      fast: false,
      kennisgaveAndere: {},
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
    const tijdstippen = {
      aantalBotsers: '',
      afgraving: false,
      andere: {},
      andereTekst: "",
      naamDeskundige: '',
      mode:'edit',
      ontstoppen: false,
      opmerkingen: '',
      redirect: false,
      reinigen: false,
      regieArbeider: '',
      regieToezichter: '',
      totAannemer: null,
      totDeskundige: null,
      totRegie: null,
      totSignalisatie: null,
      vanAannemer: null,
      vanDeskundige: null,
      vanRegie: null,
      vanSignalisatie: null,
      vaStootbanden: false,
      vullenPut: false
    };
    return Fiches.insert({
      data,
      vaststellingen,
      beslissingen,
      tijdstippen,
      bijkomende,
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
  'fiches.addToSet'(id, data) {
    d = new Date();
    var user = Meteor.user();
    data.updatedAt = d;
    data.updatedBy = user.username;
    return Fiches.update(id, {$addToSet: data});
  },
  'fiches.push'(id, data) {
    d = new Date();
    var user = Meteor.user();
    data.updatedAt = d;
    data.updatedBy = user.username;
    return Fiches.update(id, {$push: data});
  },
});
