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

import Bijlages from '../view/vaststelling';

const floatingLabelColor = {
  color: "#757575"
}
const styles = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    maxWidth: '170pt', marginBottom: '8pt', transition: 'all 0s ease-in-out'
  },
};
const itemStyle = {margin:'15px 0px 6px 0px'};
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
export default class Vaststelling extends Component {
  constructor(props) {
    super(props);
    this.data = {};
    this.state = {
      andereAanwezig: props.fiche.andereAanwezig,
      andereIncident: props.fiche.andereIncident,
      andereOngeval: props.fiche.andereOngeval,
      bermTalut: props.fiche.bermTalut,
      betStootb: props.fiche.betStootb,
      bijstandBrand: props.fiche.bijstandBrand,
      bodemverontreiniging: props.fiche.bodemverontreiniging,
      boomStruikIncident: props.fiche.boomStruikIncident,
      boomStruikOngeval: props.fiche.boomStruikOngeval,
      brandweer: props.fiche.brandweer,
      civieleBescherming: props.fiche.civieleBescherming,
      electrischeInstallatie: props.fiche.electrischeInstallatie,
      fast: props.fiche.fast,
      federalePolitie: props.fiche.federalePolitie,
      kunstwerk: props.fiche.kunstwerk,
      kunstwerkOngeval: props.fiche.kunstwerkOngeval,
      ladingverlies: props.fiche.ladingverlies,
      metStootb: props.fiche.metStootb,
      mode: props.fiche.mode,
      ongeval: props.fiche.ongeval,
      opmerkingen: props.fiche.opmerkingen,
      opstuiking: props.fiche.opstuiking,
      put: props.fiche.put,
      redirect: props.fiche.redirect,
      signalisatie: props.fiche.signalisatie,
      signalisatie2: props.fiche.signalisatie2,
      stormschade: props.fiche.stormschade,
      uurEinde: props.fiche.uurEinde,
      uurTerplaatse: props.fiche.uurTerplaatse,
      verzakking: props.fiche.verzakking,
      vangrail: props.fiche.vangrail,
      wateroverlast: props.fiche.wateroverlast,
      wegdek: props.fiche.wegdek,
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
    let dataImport = {'vastellingen': dataC};
    Meteor.call('fiches.update', this.props.ficheId, dataImport);

  }
  setAsView = () => {
    this.setState({mode: 'edit'});
    Meteor.call('fiches.update', this.props.ficheId, {'vaststellingen.mode': "edit"});
  }

  render() {
    const { data, fiche } = this.props;
    return (
      <div>
        <section id="vaststellingen" className={(this.state.mode=='edit')? 'show': 'hidden'}>
          <div style={{position: 'absolute', top:'15px', right:"60px", zIndex:"1005"}}>
            <RaisedButton label="Categorie bewaren" className={this.props.classNameProp} primary={true} onClick={this.saveThis} />
          </div>
          <div style={{display:"inline-block"}}>
            <TimePicker floatingLabelStyle={floatingLabelColor} value={this.state.uurTerplaatse} format="24hr" onChange={(event, date) => this.handleChangeTime("uurTerplaatse", event, date)} hintText="Uur ter plaatse" name="terPlaatse" floatingLabelText="Uur ter plaatse"   />
          </div>
          <div style={{display:"inline-block"}}>
            <TimePicker floatingLabelStyle={floatingLabelColor} value={this.state.uurEinde} format="24hr" onChange={(event, date) => this.handleChangeTime("uurEinde", event, date)} hintText="Uur einde" name="uurEinde" floatingLabelText="Uur einde" />
          </div>
          <h5>Aanwezig ter plaatse</h5>
          <div style={{display:'flex', flexWrap: 'wrap', alignItems:'flex-end'}}>
            <Checkbox label="Federale Politie" checked={this.state.federalePolitie} name="aanwezig[federalePolitie]" id="federalePolitie" style={styles.checkbox}  onCheck={(event, checked) => this.handleChbxChange("federalePolitie", event, checked)} />
            <Checkbox label="Brandweer" checked={this.state.brandweer} onCheck={(event, checked) => this.handleChbxChange("brandweer", event, checked)} style={styles.checkbox} />
            <Checkbox label="FAST / Takeldienst" checked={this.state.fast} onCheck={(event, checked) => this.handleChbxChange("fast", event, checked)} style={styles.checkbox} />
            <Checkbox label="Civiele Bescherming" checked={this.state.civieleBescherming} onCheck={(event, checked) => this.handleChbxChange("civieleBescherming", event, checked)} style={styles.checkbox} />
            <Checkbox label="Andere" checked={this.state.andereAanwezig} style={styles.checkbox} onCheck={(event, checked) => this.handleChbxChange("andereAanwezig", event, checked)} />
            {(this.state.andereAanwezig == true) ?  <TextField floatingLabelStyle={floatingLabelColor} floatingLabelText="Andere" name="andereAanwezigTekst" ref={input => this.data.andereAanwezigTekst = input} defaultValue={fiche.andereAanwezigTekst}/> : <div></div>}
          </div>
          <div>
            <TextField
              floatingLabelText="Opmerkingen"
              multiLine={true}
              rows={3}
              name="opmerkingen"
              style={{minWidth:"512px", maxWidth:"80%"}}
              floatingLabelStyle={floatingLabelColor}
              value={this.state.opmerkingen}
              onChange={this.handleChange}
            />
          </div>
          <h5>Incident / Schade</h5>
          <div style={{display:'flex', flexWrap: 'wrap', alignItems:'flex-end'}}>
            <Checkbox label="Put in rijbaan" checked={this.state.put} onCheck={(event, checked) => this.handleChbxChange("put", event, checked)} style={styles.checkbox} />
            <Checkbox label="Signalisatie" checked={this.state.signalisatie} onCheck={(event, checked) => this.handleChbxChange("signalisatie", event, checked)} style={styles.checkbox} />
            <Checkbox label="Boom/Struik" checked={this.state.boomStruikIncident} onCheck={(event, checked) => this.handleChbxChange("boomStruikIncident", event, checked)} style={styles.checkbox} />
            <Checkbox label="Kunstwerk" checked={this.state.kunstwerk} onCheck={(event, checked) => this.handleChbxChange("kunstwerk", event, checked)} style={styles.checkbox} />
            <Checkbox label="Verzakking" checked={this.state.verzakking} onCheck={(event, checked) => this.handleChbxChange("verzakking", event, checked)} style={styles.checkbox} />
            <Checkbox label="Opstuikingk" checked={this.state.opstuiking} onCheck={(event, checked) => this.handleChbxChange("opstuiking", event, checked)} style={styles.checkbox} />
            <Checkbox label="Met. vangrail" checked={this.state.vangrail} onCheck={(event, checked) => this.handleChbxChange("vangrail", event, checked)} style={styles.checkbox} />
            <Checkbox label="Andere" checked={this.state.andereIncident} onCheck={(event, checked) => this.handleChbxChange("andereIncident", event, checked)} style={styles.checkbox} />
            {this.state.andereIncident ? <TextField
              floatingLabelStyle={floatingLabelColor}
              floatingLabelText="Andere"
              name="andereIncidentTekst"
              ref={input => this.data.andereIncidentTekst = input}
              defaultValue={fiche.andereIncidentTekst}
            /> : <div></div>}
          </div>
          <div style={{display:'flex', alignItems:'flex-end'}}>
            <Checkbox label="Wateroverlast" checked={this.state.wateroverlast} style={styles.checkbox} onCheck={(event, checked) => this.handleChbxChange("wateroverlast", event, checked)} />
            {this.state.wateroverlast ? <TextField
              floatingLabelStyle={floatingLabelColor}
              floatingLabelText="Omschrijving wateroverlast"
              name="wateroverlastTekst"
              ref={input => this.data.wateroverlastTekst = input}
              defaultValue={fiche.wateroverlastTekst}
            /> : <div></div>}
          </div>
          <div style={{display:'flex', alignItems:'flex-end'}}>
            <Checkbox label="Stormschade" checked={this.state.stormschade} style={styles.checkbox}onCheck={(event, checked) => this.handleChbxChange("stormschade", event, checked)} />
            {this.state.stormschade ? <TextField
              floatingLabelStyle={floatingLabelColor}
              floatingLabelText="Omschrijving Stormschade"
              name="stormschadeTekst"
              ref={input => this.data.stormschadeTekst = input}
              defaultValue={fiche.stormschadeTekst}
            /> : <div></div>}
          </div>
          <div>
            <Checkbox label="Ongeval" style={styles.checkbox} checked={this.state.ongeval} onCheck={(event, checked) => this.handleChbxChange("ongeval", event, checked)} />
          </div>
          <div style={{flexWrap: 'wrap', alignItems:'flex-end'}} className={!this.state.ongeval ? "hidden": "flex"}>
            <Checkbox label="Met. stootb." checked={this.state.metStootb} onCheck={(event, checked) => this.handleChbxChange("metStootb", event, checked)} style={styles.checkbox} />
            <Checkbox label="Bet. stootb." checked={this.state.betStootb} onCheck={(event, checked) => this.handleChbxChange("betStootb", event, checked)} style={styles.checkbox} />
            <Checkbox label="Signalisatie" checked={this.state.signalisatie2} onCheck={(event, checked) => this.handleChbxChange("signalisatie2", event, checked)} style={styles.checkbox} />
            <Checkbox label="Elektrische Installatie" checked={this.state.electrischeInstallatie} onCheck={(event, checked) => this.handleChbxChange("electrischeInstallatie", event, checked)} style={styles.checkbox} />
            <Checkbox label="Boom/Struik" checked={this.state.boomStruikOngeval} onCheck={(event, checked) => this.handleChbxChange("boomStruikOngeval", event, checked)} style={styles.checkbox} />
            <Checkbox label="Kunstwerk." checked={this.state.kunstwerkOngeval} onCheck={(event, checked) => this.handleChbxChange("kunstwerkOngeval", event, checked)} style={styles.checkbox} />
            <Checkbox label="Berm/talut" checked={this.state.bermTalut} onCheck={(event, checked) => this.handleChbxChange("bermTalut", event, checked)} style={styles.checkbox} />
            <Checkbox label="Wegdek" checked={this.state.wegdek} onCheck={(event, checked) => this.handleChbxChange("wegdek", event, checked)} style={styles.checkbox} />
            <Checkbox label="Bijstand brand" checked={this.state.bijstandBrand} onCheck={(event, checked) => this.handleChbxChange("bijstandBrand", event, checked)} style={styles.checkbox} />
            <Checkbox label="Andere" checked={this.state.andereOngeval} onCheck={(event, checked) => this.handleChbxChange("andereOngeval", event, checked)} style={styles.checkbox} />
            {this.state.andereOngeval ? <TextField
              floatingLabelStyle={floatingLabelColor}
              floatingLabelText="Andere"
              name="andereOngevalTekst"
              ref={input => this.data.andereOngevalTekst = input}
              defaultValue={fiche.andereOngevalTekst}
            /> : <div></div>}
          </div>
          <div style={{display:'flex', alignItems:'flex-end'}}>
            <Checkbox label="Ladingverlies" checked={this.state.ladingverlies} style={styles.checkbox} onCheck={(event, checked) => this.handleChbxChange("ladingverlies", event, checked)} />
            {this.state.ladingverlies ? <TextField
              floatingLabelStyle={floatingLabelColor}
              floatingLabelText="Omschrijving Ladingverlies"
              name="ladingverliesTekst"
              ref={input => this.data.ladingverliesTekst = input}
              defaultValue={fiche.ladingverliesTekst}
            /> : <div></div>}
          </div>
          <div style={{display:'flex', alignItems:'flex-end'}}>
            <Checkbox label="Bodemverontreiniging" checked={this.state.bodemverontreiniging} style={styles.checkbox} onCheck={(event, checked) => this.handleChbxChange("bodemverontreiniging", event, checked)} />
            {this.state.bodemverontreiniging ? <TextField
              floatingLabelStyle={floatingLabelColor}
              floatingLabelText="Omschrijving Bodemverontreiniging"
              name="bodemverontreinigingTekst"
              ref={input => this.data.bodemverontreinigingTekst = input}
              defaultValue={fiche.bodemverontreinigingTekst}
            /> : <div></div>}
          </div>
        </section>
        <section id="vaststellingen_view" className={(this.state.mode=='view')? 'show': 'hidden'} style={{padding: '8px 0px 20px 0px'}}>
          <div style={{position: 'absolute', top:'15px', right:"60px", zIndex:"1005"}}>
            <RaisedButton label="Categorie bewerken" secondary={true} onClick={this.setAsView} />
          </div>
          <p>Aanwezig van <strong>{moment(fiche.uurTerplaatse).format('HH:MM')}</strong> tot <strong>{moment(fiche.uurEinde).format('HH:MM')}</strong></p>
          <p>De volgende diensten waren aanwezig:</p>
          <ul>
            {fiche.federalePolitie? <li><strong>Federale Politie</strong></li> : ""}
            {fiche.brandweer? <li><strong>Brandweer</strong></li> : ""}
            {fiche.fast? <li><strong>FAST / Takeldienst</strong></li> : ""}
            {fiche.civieleBescherming? <li><strong>Civiele Bescherming</strong></li> : ""}
            {fiche.andereAanwezig? <li><strong>{fiche.andereAanwezigTekst}</strong></li> : ""}
          </ul>
          <p>Opmerkingen:</p>
          <p><strong>{fiche.opmerkingen}</strong></p>
          <p>Er waren de volgende incidenten / schadegevallen:</p>
          <ul>
            {fiche.put? <li><strong>Put in rijbaan</strong></li> : ""}
            {fiche.signalisatie? <li><strong>Signalisatie</strong></li> : ""}
            {fiche.boomStruikIncident? <li><strong>Boom/Struik</strong></li> : ""}
            {fiche.kunstwerk? <li><strong>Kunstwerk</strong></li> : ""}
            {fiche.verzakking? <li><strong>Verzakking</strong></li> : ""}
            {fiche.opstuiking? <li><strong>Opstuikingk</strong></li> : ""}
            {fiche.vangrail? <li><strong>Met. vangrail</strong></li> : ""}
            {fiche.andereIncident? <li><strong>Andere: {fiche.andereIncidentTekst}</strong></li> : ""}
            {fiche.stormschade ? <li><strong>Stormschade: {fiche.stormschadeTekst}</strong></li> : ''}
            {fiche.wateroverlast ? <li><strong>Wateroverlast: {fiche.wateroverlastTekst}</strong></li> : ''}
          </ul>
          {fiche.ongeval ? <div><p>Er was een ongeval</p>
            <ul>
              {fiche.metStootb? <li><strong>Met. stootb.</strong></li> : ""}
              {fiche.betStootb? <li><strong>Bet. stootb.</strong></li> : ""}
              {fiche.signalisatie2? <li><strong>Signalisatie</strong></li> : ""}
              {fiche.electrischeInstallatie? <li><strong>Elektrische Installatie</strong></li> : ""}
              {fiche.boomStruikOngeval? <li><strong>Boom/struik</strong></li> : ""}
              {fiche.kunstwerkOngeval? <li><strong>Kunstwerk.</strong></li> : ""}
              {fiche.bermTalut? <li><strong>Berm/talut</strong></li> : ""}
              {fiche.wegdek? <li><strong>Wegdek</strong></li> : ""}
              {fiche.bijstandBrand ? <li><strong>Bijstand brand</strong></li> : ''}
              {fiche.andereOngeval? <li><strong>Andere: {fiche.andereOngevalTekst}</strong></li> : ""}
              {fiche.ladingverlies ? <li><strong>Ladingverlies: {fiche.ladingverliesTekst}</strong></li> : ''}
              {fiche.bodemverontreiniging ? <li><strong>Bodemverontreiniging: {fiche.bodemverontreinigingTekst}</strong></li> : ''}
            </ul>
          </div> : '' }
        </section>
      </div>
    );
  }
}
