// react imports
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { withRouter, Redirect } from 'react-router';
import createHistory from 'history/createBrowserHistory';
import moment from 'moment-es6';
import PropTypes from 'prop-types';

import areIntlLocalesSupported from 'intl-locales-supported';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import TimePicker from 'material-ui/TimePicker';
import Checkbox from 'material-ui/Checkbox';
import Dialog from 'material-ui/Dialog';

import BeslissingView from '../view/beslissing';

const floatingLabelColor = {
  color: "#757575"
}
const styles = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    maxWidth: '170pt',
    marginBottom: '8pt'
  },
};
//locales
let DateTimeFormat;
if (areIntlLocalesSupported(['nl', 'nl-BE'])) {
  DateTimeFormat = global.Intl.DateTimeFormat;
} else {
  const IntlPolyfill = require('intl');
  DateTimeFormat = IntlPolyfill.DateTimeFormat;
  require('intl/locale-data/jsonp/nl');
  require('intl/locale-data/jsonp/nl-BE');
}
export default class Beslissing extends Component {
  constructor(props) {
    super(props);
    this.data = {};
    this.state = {
      aannemer: props.fiche.aannemer,
      bodemdeskundige: props.fiche.bodemdeskundige,
      BotsersBestek: props.fiche.BotsersBestek,
      brandweer: props.fiche.brandweer,
      civieleBescherming: props.fiche.civieleBescherming,
      fast: props.fiche.fast,
      kennisgaveAndere: props.fiche.kennisgaveAndere,
      kennisgaveAndereTekst: "",
      kennisgavePolitie: props.fiche.kennisgavePolitie,
      mode: props.fiche.mode,
      naOproepAannemer: props.fiche.naOproepAannemer,
      naOproepRegie: props.fiche.naOproepRegie,
      naVaststellingAannemer: props.fiche.naVaststellingAannemer,
      naVaststellingRegie: props.fiche.naVaststellingRegie,
      open:false,
      politie: props.fiche.politie,
      redirect: false,
      regie: props.fiche.regie,
      signalisatie: props.fiche.signalisatie,
      signalisatieAannemer: props.fiche.signalisatieAannemer,
      uurOproepAannemer: props.fiche.uurOproepAannemer,
      uurOproepBodemdeskundige: props.fiche.uurOproepBodemdeskundige,
      uurOproepRegie: props.fiche.uurOproepRegie,
      uurOproepSignalisatie: props.fiche.uurOproepSignalisatie,
      VVC: props.fiche.VVC,
      VTC: props.fiche.VTC,
    };
  }
  KennisgaveAndereOptieToevoegen = () => {
   this.setState({open: true});
  };

  handleAdd = (event) => {
    this.setState({open: false, kennisgaveAndere: {...this.state.kennisgaveAndere, [this.state.kennisgaveAndereTekst]: true}, kennisgaveAndereTekst: ""});
  };

  renderKennisgaveAnderItems(){
    return Object.keys(this.state.kennisgaveAndere).map((key, bool) => (
      <Checkbox key={key} label={key} checked={this.state.kennisgaveAndere[key]} onCheck={(event, checked) => this.handleChbxChangeAndere(key, event, checked)} style={styles.checkbox} />
    ));
  }
  handleClose = () => {
   this.setState({open: false});
  };

  handleChange = (event) => this.setState({[event.target.name]: event.target.value});
  handleChangeTime = (id, event, date) => this.setState({[id]: date});
  handleChbxChange = (id, event, checked) => {
    this.setState({[id]: checked});
  }
  handleChbxChangeAndere = (id, event, checked) => {
    this.state.kennisgaveAndere[id] = checked;
    this.setState({kennisgaveAndere: this.state.kennisgaveAndere});
  }
  saveThis = () => {
    this.setState({mode: 'view'});
    const {data, state} = this;
    let dataInputs = {};
    for (var key in data) {
      if("input" in data[key]){
        dataInputs[data[key]["input"]["name"]] = data[key]["input"]["value"];
      }
    };
    console.log(this.props.ficheId);
    state.mode= 'view';
    const dataC = Object.assign({}, dataInputs, state);
    let dataImport = {'beslissingen': dataC};
    Meteor.call('fiches.update', this.props.ficheId, dataImport);

  }
  setAsView = () => {
    this.setState({mode: 'edit'});
    Meteor.call('fiches.update', this.props.ficheId, {'beslissing.mode': "edit"});
  }

  render() {
    const { data, fiche } = this.props;
    const actions = [
      <FlatButton
        label="Annuleren"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Toevoegen"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleAdd}
      />,
    ];
    return (
      <div>
        <section id="beslissing"  className={(this.state.mode=='edit')? 'show': 'hidden'}>
          <div style={{position: 'absolute', top:'15px', right:"60px", zIndex:"1005"}}>
            <RaisedButton label="Categorie bewaren" className={this.props.classNameProp} primary={true} onClick={this.saveThis} />
          </div>
          <div style={{fontSize: "0.83em", fontWeight: "bold"}}>Oproep aan</div>
          <div style={{display:'flex', flexWrap: 'wrap', alignItems:'flex-end'}}>
            <Checkbox label="Regie" checked={this.state.regie} onCheck={(event, checked) => this.handleChbxChange("regie", event, checked)} style={styles.checkbox} />
            <div className={!this.state.regie ? "hidden": "flex"} style={{alignItems:'flex-end'}}>
              <TimePicker floatingLabelStyle={floatingLabelColor} value={this.state.uurOproepRegie} format="24hr" onChange={(event, date) => this.handleChangeTime("uurOproepRegie", event, date)} hintText="Uur oproep" name="uurOproepRegie" floatingLabelText="Uur oproep" />
              <Checkbox label="Na oproep" checked={this.state.naOproepRegie} onCheck={(event, checked) => this.handleChbxChange("naOproepRegie", event, checked)}  style={styles.checkbox} />
              <Checkbox label="Na vaststellingen" checked={this.state.naVaststellingRegie} onCheck={(event, checked) => this.handleChbxChange("naVaststellingRegie", event, checked)}  style={styles.checkbox} />
            </div>
          </div>
          <div >
            <div style={{display:'flex', flexWrap: 'wrap', alignItems:'flex-end'}}>
              <Checkbox label="Aannemer" checked={this.state.aannemer} onCheck={(event, checked) => this.handleChbxChange("aannemer", event, checked)} style={styles.checkbox} />
              <div className={!this.state.aannemer ? "hidden": "flex"} style={{alignItems:'flex-end'}}>
                <TimePicker floatingLabelStyle={floatingLabelColor} value={this.state.uurOproepAannemer} format="24hr" onChange={(event, date) => this.handleChangeTime("uurOproepAannemer", event, date)} hintText="Uur oproep" name="uurOproepAannemer" floatingLabelText="Uur oproep" />
                <TextField
                  floatingLabelStyle={floatingLabelColor}
                  floatingLabelText="Naam aannemer"
                  name="naamAannemer"
                  ref={input => this.data.naamAannemer = input}
                  value={fiche.naamAannemer}
                />
                <Checkbox label="Na oproep" checked={this.state.naOproepAannemer} onCheck={(event, checked) => this.handleChbxChange("naOproepAannemer", event, checked)} style={{maxWidth:'256px', marginBottom: '8pt'}} />
                <Checkbox label="Na vaststellingen" checked={this.state.naVaststellingAannemer} onCheck={(event, checked) => this.handleChbxChange("naVaststellingAannemer", event, checked)} style={styles.checkbox} />
              </div>
            </div>
          </div>
          <div style={{display:'flex', flexWrap: 'wrap', alignItems:'flex-end'}}>
            <Checkbox label="Signalisatie" checked={this.state.signalisatie} onCheck={(event, checked) => this.handleChbxChange("signalisatie", event, checked)} style={styles.checkbox} />
            <div className={!this.state.signalisatie ? "hidden": "flex"} style={{alignItems:'flex-end'}}>
              <TimePicker floatingLabelStyle={floatingLabelColor} value={this.state.uurOproepSignalisatie} format="24hr" onChange={(event, date) => this.handleChangeTime("uurOproepSignalisatie", event, date)} hintText="Uur oproep" name="uurOproepSignalisatie" floatingLabelText="Uur oproep" />
              <Checkbox label="Botsers Bestek" checked={this.state.BotsersBestek} onCheck={(event, checked) => this.handleChbxChange("BotsersBestek", event, checked)} style={styles.checkbox} />
              <Checkbox label="Aannemer" checked={this.state.signalisatieAannemer} onCheck={(event, checked) => this.handleChbxChange("signalisatieAannemer", event, checked)} style={styles.checkbox} />
            </div>
          </div>
          <div style={{display:'flex', flexWrap: 'wrap', alignItems:'flex-end'}}>
            <Checkbox label="Bodemdeskundige" checked={this.state.bodemdeskundige} onCheck={(event, checked) => this.handleChbxChange("bodemdeskundige", event, checked)} style={styles.checkbox} />
            <div className={!this.state.bodemdeskundige ? "hidden": "flex"} style={{alignItems:'flex-end'}}>
              <TimePicker floatingLabelStyle={floatingLabelColor} value={this.state.uurOproepBodemdeskundige} format="24hr" onChange={(event, date) => this.handleChangeTime("uurOproepBodemdeskundige", event, date)} hintText="Uur oproep" name="uurOproepBodemdeskundige" floatingLabelText="Uur oproep" />
              <TextField
                floatingLabelStyle={floatingLabelColor}
                floatingLabelText="Naam Bodemdeskundige"
                name="naamBodemdeskundig"
                ref={input => this.data.naamBodemdeskundig = input}
                value={fiche.naamBodemdeskundig}
              />
            </div>
          </div>
          <div>
            <Checkbox label="Politie" checked={this.state.politie} onCheck={(event, checked) => this.handleChbxChange("politie", event, checked)} style={styles.checkbox} />
            <Checkbox label="Brandweer" checked={this.state.brandweer} onCheck={(event, checked) => this.handleChbxChange("brandweer", event, checked)} style={styles.checkbox} />
            <Checkbox label="Civiele Bescherming" checked={this.state.civieleBescherming} onCheck={(event, checked) => this.handleChbxChange("civieleBescherming", event, checked)} style={styles.checkbox} />
            <Checkbox label="FAST/Takeldiensten" checked={this.state.fast} onCheck={(event, checked) => this.handleChbxChange("fast", event, checked)} style={styles.checkbox} />
          </div>
          <h5>Kennisgave Aan</h5>
            <div style={{display:'flex', flexWrap: 'wrap', alignItems:'flex-end'}}>
              <Checkbox label="VVC" checked={this.state.VVC} onCheck={(event, checked) => this.handleChbxChange("VVC", event, checked)} style={styles.checkbox} />
              <Checkbox label="VTC" checked={this.state.VTC} onCheck={(event, checked) => this.handleChbxChange("VTC", event, checked)} style={styles.checkbox} />
              <Checkbox label="Politie" checked={this.state.kennisgavePolitie} onCheck={(event, checked) => this.handleChbxChange("kennisgavePolitie", event, checked)} style={styles.checkbox} />
              {this.renderKennisgaveAnderItems()}
              <RaisedButton label="Andere toevoegen" className={this.props.classNameProp} primary={true} onClick={this.KennisgaveAndereOptieToevoegen} />
            </div>
            <Dialog
              title="Andere categorie toevoegen"
              actions={actions}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
            >
              <TextField
                floatingLabelStyle={floatingLabelColor}
                floatingLabelText="Andere categorie"
                name="kennisgaveAndereTekst"
                value={this.state.kennisgaveAndereTekst}
                onChange={this.handleChange}
              />
            </Dialog>
        </section>
        <section id="beslissingen_view" className={(this.state.mode=='view')? 'show': 'hidden'} style={{padding: '8px 0px 20px 0px'}}>
          <div style={{position: 'absolute', top:'15px', right:"60px", zIndex:"1005"}}>
            <RaisedButton label="Categorie bewerken" className={this.props.classNameProp} secondary={true} onClick={this.setAsView} />
          </div>
          <BeslissingView fiche={fiche} />
        </section>
      </div>
    );
  }
}
