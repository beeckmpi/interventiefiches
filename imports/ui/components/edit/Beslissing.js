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
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import TimePicker from 'material-ui/TimePicker';
import Checkbox from 'material-ui/Checkbox';

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
      aannemer: false,
      bodemdeskundige: false,
      BotsersBestek: false,
      brandweer: false,
      civieleBescherming: false,
      fast: false,
      kennisgaveAndere: false,
      kennisgavePolitie: false,
      mode: "edit",
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
    };
  }
  handleChange = (event) => this.setState({[event.target.name]: event.target.value});
  handleChangeTime = (id, event, date) => this.setState({[id]: date});
  handleChbxChange = (id, event, checked) => {
    this.setState({[id]: checked});
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

    return (
      <div>
        <section id="beslissing"  className={(this.state.mode=='edit')? 'show': 'hidden'}>
          <div style={{position: 'absolute', top:'15px', right:"60px", zIndex:"1005"}}>
            <RaisedButton label="Categorie bewaren" primary={true} onClick={this.saveThis} />
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
                />
                <Checkbox label="Na oproep" checked={this.state.aannemer} onCheck={(event, checked) => this.handleChbxChange("naOproepAannemer", event, checked)} style={{maxWidth:'256px', marginBottom: '8pt'}} />
                <Checkbox label="Na vaststellingen" checked={this.state.aannemer} onCheck={(event, checked) => this.handleChbxChange("naVaststellingAannemer", event, checked)} style={styles.checkbox} />
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
              />
            </div>
          </div>
          <div>
            <Checkbox label="Politie" checked={this.state.politie} onCheck={(event, checked) => this.handleChbxChange("politie", event, checked)} style={styles.checkbox} />
            <Checkbox label="Brandweer" checked={this.state.brandweer} onCheck={(event, checked) => this.handleChbxChange("brandweer", event, checked)} style={styles.checkbox} />
            <Checkbox label="Civiele Bescherming" checked={this.state.civieleBescherming} onCheck={(event, checked) => this.handleChbxChange("civieleBescherming", event, checked)} style={styles.checkbox} />
            <Checkbox label="FAST/Takeldienste" checked={this.state.fast} onCheck={(event, checked) => this.handleChbxChange("fast", event, checked)} style={styles.checkbox} />
          </div>
          <h5>Kennisgave Aan</h5>
            <div style={{display:'flex', flexWrap: 'wrap', alignItems:'flex-end'}}>
              <Checkbox label="VVC" checked={this.state.VVC} onCheck={(event, checked) => this.handleChbxChange("VVC", event, checked)} style={styles.checkbox} />
              <Checkbox label="VTC" checked={this.state.VTC} onCheck={(event, checked) => this.handleChbxChange("VTC", event, checked)} style={styles.checkbox} />
              <Checkbox label="Politie" checked={this.state.kennisgavePolitie} onCheck={(event, checked) => this.handleChbxChange("kennisgavePolitie", event, checked)} style={styles.checkbox} />
              <Checkbox label="Andere" checked={this.state.kennisgaveAndere} onCheck={(event, checked) => this.handleChbxChange("kennisgaveAndere", event, checked)} style={styles.checkbox} />
                {this.state.kennisgaveAndere ? <TextField
                  floatingLabelStyle={floatingLabelColor}
                  floatingLabelText="Andere"
                  name="kennisgaveAndereTekst"
                  ref={input => this.data.kennisgaveAndereTekst = input}
                /> : <div></div>}
            </div>
        </section>
        <section id="beslissingen_view" className={(this.state.mode=='view')? 'show': 'hidden'} style={{padding: '8px 0px 20px 0px'}}>
          <div style={{position: 'absolute', top:'15px', right:"60px", zIndex:"1005"}}>
            <RaisedButton label="Categorie bewerken" secondary={true} onClick={this.setAsView} />
          </div>
          
        </section>
      </div>
    );
  }
}
