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
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import TimePicker from 'material-ui/TimePicker';
import Checkbox from 'material-ui/Checkbox';
import Dialog from 'material-ui/Dialog';

import TijdstippenView from '../view/tijdstippen';

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
const textStyle = {whiteSpace: 'pre-line'};
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
export default class Tijdstippen extends Component {
  constructor(props) {
    super(props);
    this.data = {};
    this.state = {
      afgraving: props.fiche.afgraving,
      andere: props.fiche.andere,
      andereTekst: "",
      mode:props.fiche.mode,
      ontstoppen: props.fiche.ontstoppen,
      opmerkingen: props.fiche.opmerkingen,
      reinigen: props.fiche.reinigen,
      totAannemer: props.fiche.totAannemer,
      totDeskundige: props.fiche.totDeskundige,
      totRegie: props.fiche.totRegie,
      open:false,
      totSignalisatie: props.fiche.totSignalisatie,
      vanAannemer: props.fiche.vanAannemer,
      vanDeskundige: props.fiche.vanDeskundige,
      vanRegie: props.fiche.vanRegie,
      vanSignalisatie: props.fiche.vanSignalisatie,
      vaStootbanden: props.fiche.vaStootbanden,
      vullenPut: props.fiche.vullenPut
    };
  }

  andereOptieToevoegen = () => {this.setState({open: true})};

  handleAdd = (event) => { this.setState({open: false, andere: {...this.state.andere, [this.state.andereTekst]: true}, andereTekst: ""})};

  renderAndereItems(){
    return Object.keys(this.state.andere).map((key, bool) => (
      <Checkbox key={key} label={key} checked={this.state.andere[key]} onCheck={(event, checked) => this.handleChbxChangeAndere(key, event, checked)} style={styles.checkbox} />
    ));
  }

  handleChbxChangeAndere = (id, event, checked) => {
    this.state.andere[id] = checked;
    this.setState({andere: this.state.andere});
  }

  handleClose = () => { this.setState({open: false}); };

  handleChange = (event) => this.setState({[event.target.name]: event.target.value});

  handleChangeTime = (id, event, date) => this.setState({[id]: date});

  handleChbxChange = (id, event, checked) => {this.setState({[id]: checked});}

  saveThis = () => {
    this.setState({mode: 'view'});
    const {data, state} = this;
    let dataInputs = {};
    for (var key in data) {
      if("input" in data[key]){
        dataInputs[data[key]["input"]["name"]] = data[key]["input"]["value"];
      }
    };
    state.mode= 'view';
    const dataC = Object.assign({}, dataInputs, state);
    let dataImport = {'tijdstippen': dataC};
    Meteor.call('fiches.update', this.props.ficheId, dataImport);
  }

  setAsView = () => {
    this.setState({mode: 'edit'});
    Meteor.call('fiches.update', this.props.ficheId, {'tijdstippen.mode': "edit"});
  }

  render() {
    const { fiche } = this.props;
    const {data, state} = this;
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
        <section id="tijdstippen"  className={(this.state.mode=='edit')? 'show': 'hidden'}>
          <div style={{position: 'absolute', top:'15px', right:"60px", zIndex:"1005"}}>
            <RaisedButton label="Categorie bewaren"  className={this.props.classNameProp} primary={true} onClick={this.saveThis} />
          </div>
          <div style={{fontSize: "0.83em", fontWeight: "bold"}}></div>
          <div style={{width: '200px', fontWeight: "bold"}}>Regie ter plaatse:</div>
          <div style={{display:'flex', flexWrap: 'wrap', alignItems:'flex-end'}}>
            <TimePicker floatingLabelStyle={floatingLabelColor} onChange={(event, date) => this.handleChangeTime("vanRegie", event, date)} value={state.vanRegie} format="24hr" hintText="Van" name="regieVan" floatingLabelText="Van" />
            <TimePicker floatingLabelStyle={floatingLabelColor} onChange={(event, date) => this.handleChangeTime("totRegie", event, date)} value={state.totRegie} format="24hr" hintText="Tot" name="regieTot" floatingLabelText="Tot" />
            <TextField floatingLabelStyle={floatingLabelColor} floatingLabelText="Regie arbeider" ref={input => data.regieArbeider = input} defaultValue={fiche.regieArbeider} type="number" name="regieArbeider" />
          </div>
          <div style={{width: '200px', fontWeight: "bold"}}>Aannemer ter plaatse:</div>
          <div style={{display:'flex', flexWrap: 'wrap', alignItems:'flex-end'}}>
            <TimePicker floatingLabelStyle={floatingLabelColor} onChange={(event, date) => this.handleChangeTime("vanAannemer", event, date)} value={state.vanAannemer} format="24hr" hintText="Van" name="regieVan" floatingLabelText="Van" />
            <TimePicker floatingLabelStyle={floatingLabelColor} onChange={(event, date) => this.handleChangeTime("totAannemer", event, date)} value={state.totAannemer} format="24hr" hintText="Tot" name="regieTot" floatingLabelText="Tot" />
            <TextField floatingLabelStyle={floatingLabelColor} floatingLabelText="Ploegbaas Aannemer" ref={input => data.regieToezichter = input} defaultValue={fiche.regieToezichter} type="text" name="regieToezichter" />
          </div>
          <div style={{width: '200px', fontWeight: "bold"}}>Signalisatie ter plaatse:</div>
          <div style={{display:'flex', flexWrap: 'wrap', alignItems:'flex-end'}}>
            <TimePicker floatingLabelStyle={floatingLabelColor} onChange={(event, date) => this.handleChangeTime("vanSignalisatie", event, date)} value={state.vanSignalisatie} format="24hr" hintText="Van" name="regieVan" floatingLabelText="Van" />
            <TimePicker floatingLabelStyle={floatingLabelColor} onChange={(event, date) => this.handleChangeTime("totSignalisatie", event, date)} value={state.totSignalisatie} format="24hr" hintText="Tot" name="regieTot" floatingLabelText="Tot" />
            <TextField floatingLabelStyle={floatingLabelColor} floatingLabelText="Aantal Botsers" ref={input => data.aantalBotsers = input} defaultValue={fiche.aantalBotsers} type="number" name="aantalBotsers" />
          </div>
          <div style={{width: '200px', fontWeight: "bold"}}>Deskundige ter plaatse:</div>
          <div style={{display:'flex', flexWrap: 'wrap', alignItems:'flex-end'}}>
            <TimePicker floatingLabelStyle={floatingLabelColor} onChange={(event, date) => this.handleChangeTime("vanDeskundige", event, date)} value={state.vanDeskundige} format="24hr" hintText="Van" name="regieVan" floatingLabelText="Van" />
            <TimePicker floatingLabelStyle={floatingLabelColor} onChange={(event, date) => this.handleChangeTime("totDeskundige", event, date)} value={state.totDeskundige} format="24hr" hintText="Tot" name="regieTot" floatingLabelText="Tot" />
            <TextField floatingLabelStyle={floatingLabelColor} floatingLabelText="Deskundige" ref={input => data.naamDeskundige = input} defaultValue={fiche.naamDeskundige} type="text" name="naamDeskundige" />
          </div>
          <div style={{width: '200px', fontWeight: "bold", paddingBottom: '10px'}}>Ondernomen actie:</div>
          <div style={{display:'flex', flexWrap: 'wrap', alignItems:'flex-end'}}>
            <Checkbox label="Afgraving" checked={state.afgraving} onCheck={(event, checked) => this.handleChbxChange("afgraving", event, checked)} style={styles.checkbox} />
            <Checkbox label="Ontstoppen riolering" checked={state.ontstoppen} onCheck={(event, checked) => this.handleChbxChange("ontstoppen", event, checked)} style={styles.checkbox} />
            <Checkbox label="Reinigen wegdek" checked={state.reinigen} onCheck={(event, checked) => this.handleChbxChange("reinigen", event, checked)} style={styles.checkbox} />
            <Checkbox label="Aanpassen stootbanden" checked={state.vaStootbanden} onCheck={(event, checked) => this.handleChbxChange("vaStootbanden", event, checked)} style={styles.checkbox} />
            <Checkbox label="Vullen put" checked={state.vullenPut} onCheck={(event, checked) => this.handleChbxChange("vullenPut", event, checked)} style={styles.checkbox} />
            {this.renderAndereItems()}
            <RaisedButton label="Andere toevoegen" className={this.props.classNameProp} primary={true} onClick={this.andereOptieToevoegen} />
          </div>
          <Dialog
            title="Andere categorie toevoegen"
            actions={actions}
            modal={false}
            open={state.open}
            onRequestClose={this.handleClose}
          >
            <TextField
              floatingLabelStyle={floatingLabelColor}
              floatingLabelText="Andere categorie"
              name="andereTekst"
              value={state.andereTekst}
              onChange={this.handleChange}
            />
          </Dialog>
          <TextField
            floatingLabelText="Opmerkingen"
            multiLine={true}
            rows={3}
            name="opmerkingen"
            style={{minWidth:"512px", maxWidth:"80%", whiteSpace: 'pre-line'}}
            floatingLabelStyle={floatingLabelColor}
            value={state.opmerkingen}
            onChange={this.handleChange}
          />
        </section>
        <section id="tijdstippen_view" className={(this.state.mode=='view')? 'show': 'hidden'} style={{padding: '8px 0px 20px 0px'}}>
          <div style={{position: 'absolute', top:'15px', right:"60px", zIndex:"1005"}}>
            <RaisedButton label="Categorie bewerken" className={this.props.classNameProp} secondary={true} onClick={this.setAsView} />
          </div>
          <TijdstippenView fiche={fiche} />
        </section>
      </div>
    );
  }
}
