//Meteor imports
import { Meteor } from 'meteor/meteor';

// react imports
import React, { Component } from 'react';

// material-ui imports
import areIntlLocalesSupported from 'intl-locales-supported';
import DatePicker from 'material-ui/DatePicker';
import FontIcon from 'material-ui/FontIcon';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import TimePicker from 'material-ui/TimePicker';

import { fiches } from '../../../api/fiches/methods.js';

//styles
const paperTableStyle = {
  minWidth: '50%',
  maxWidth: '70%',
  marginBottom: '20px'
}
const tableStyle = {
  width: '100%'
}
const floatingLabelColor = {
  color: "#757575"
}

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

export default class FicheToevoegen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      andereMelding: "",
      andereMeldingShow: "hidden",
      andereOproep: "",
      andereOproepShow: "hidden",
      bijkomendeInformatie: "",
      district: "",
      doorgegevenAan: "",
      gewestweg: "",
      grondgebied: "",
      huisnummer: "",
      kmPuntTot: "",
      kmPuntVan: "",
      melding: "",
      opDatum: null,
      opmerkingBereikbaarheid: '',
      oproep: null,
      oproepDoor: "",
      provinciaalCoordinator: "",
      richting: "",
      rijrichting: "",
      showRowHover: "",
      straat: "",
      weg: "",
      height: '300px',
    };
  }
  handleChangeDate = (event, date) => this.setState({"opDatum": date});
  handleChangeTime = (event, date) => this.setState({"oproep": date});
  handleChange = (event) => this.setState({[event.target.name]: event.target.value});
  handleChangeSelect = (id, event, index, value) => {
    this.setState({[id]: value});
    if (id=="oproepDoor" || id=="melding" ){
      if (value == "Andere"){
        if(id=="oproepDoor"){
          this.setState({"andereOproepShow": "show"});
        } else if (id=="melding") {
          this.setState({"andereMeldingShow": "show"});
        }
      } else {
        if(id=="oproepDoor"){
          this.setState({"andereOproepShow": "hidden"});
        } else if (id=="melding") {
          this.setState({"andereMeldingShow": "hidden"});
        }
      }
    }
  }
  submitForm = (event) => {
    event.preventDefault();
    Meteor.call('fiches.insert', this.state, function(err, result){
      console.log(result);
    });
  }
  render() {
    const {
      andereMelding,
      andereMeldingShow,
      andereOproep,
      andereOproepShow,
      bijkomendeInformatie,
      district,
      doorgegevenAan,
      gewestweg,
      grondgebied,
      huisnummer,
      kmPuntTot,
      kmPuntVan,
      melding,
      opDatum,
      opmerkingBereikbaarheid,
      oproep,
      oproepDoor,
      provinciaalCoordinator,
      richting,
      rijrichting,
      showRowHover,
      straat,
      weg
    } = this.state;
    return (
      <div className="container" style={{margin:"10px 30px 40px 230px", padding:"5px 8px 15px 8px"}}>
        <h3 style={{color:"#fff", marginLeft:"30px"}}>Fiche Toevoegen</h3>
        <Paper id="content" style={{padding:"15px 15px 15px 15px"}}>
          <div style={{display:"inline-block"}}>
            <DatePicker floatingLabelStyle={floatingLabelColor} hintText="Op datum" locale="nl"  DateTimeFormat={Intl.DateTimeFormat} floatingLabelText="Op (Datum)" value={opDatum} name="opDatum" onChange={this.handleChangeDate}  mode="landscape" />
          </div>
          <div style={{display:"inline-block"}}>
            <TimePicker floatingLabelStyle={floatingLabelColor} format="24hr" hintText="Oproep" name="oproep" floatingLabelText="Oproep"  onChange={this.handleChangeTime} />
          </div>
          <div>
            <TextField
              hintText="Bijkomende Informatie"
              floatingLabelText="Bijkomende Informatie"
              multiLine={true}
              rows={2}
              name="bijkomendeInformatie"
              onChange={this.handleChange}
              value={bijkomendeInformatie}
              style={{minWidth:"512px", maxWidth:"80%"}}
              floatingLabelStyle={floatingLabelColor}
            />
          </div>
          <div>
            <SelectField
              floatingLabelText="District"
              floatingLabelStyle={floatingLabelColor}
              name="district"
              id="district"
              value={district}
              onChange={(event, index, value) => this.handleChangeSelect("district", event, index, value)}
            >
              <MenuItem value={121} primaryText="Antwerpen d'Herbouvillekaai (121)" />
              <MenuItem value={123} primaryText="Brecht (123)" />
              <MenuItem value={100} primaryText="Directie (100)" />
              <MenuItem value={114} primaryText="Geel (114)" />
              <MenuItem value={112} primaryText="Puurs (112)" />
              <MenuItem value={125} primaryText="Vosselaar (125)" />
            </SelectField>
          </div>
          <div>
            <TextField
              hintText="Provinciaal coördinator"
              floatingLabelStyle={floatingLabelColor}
              floatingLabelText="Oproep ontvangen door"
              name="provinciaalCoordinator"
              onChange={this.handleChange}
              value={provinciaalCoordinator}
              style={{minWidth: "512px"}}
            />
          </div>
          <div>
            <SelectField
              floatingLabelText="Doorgegeven door Provinciaal Coördinator aan"
              floatingLabelStyle={floatingLabelColor}
              name="doorgegevenAan"
              id="doorgegevenAan"
              value={district}
              onChange={(event, index, value) => this.handleChangeSelect("district", event, index, value)}
              style={{minWidth: "512px"}}
            >
              <MenuItem value={"Anita Wuyts"} primaryText="Anita Wuyts" />
              <MenuItem value={"Pieter Beeckmans"} primaryText="Pieter Beeckmans" />
            </SelectField>
          </div>
          <div style={{display:"flex"}}>
            <div>
              <SelectField
                floatingLabelText="Oproep door"
                floatingLabelStyle={floatingLabelColor}
                name="oproepDoor"
                id="oproepDoor"
                value={oproepDoor}
                onChange={(event, index, value) => this.handleChangeSelect("oproepDoor", event, index, value)}
              >                
                <MenuItem value={"Politie"} primaryText="Politie" />
                <MenuItem value={"VTC"} primaryText="VTC" />
                <MenuItem value={"Andere"} primaryText="Andere" />
              </SelectField>
            </div>
            <div className={andereOproepShow}>
              <TextField
                hintText="Andere"
                floatingLabelStyle={floatingLabelColor}
                floatingLabelText="Andere"
                name="andereOproep"
                onChange={this.handleChange}
                value={andereOproep}
              />
            </div>
          </div>
          <div style={{display:"flex"}}>
            <div>
              <SelectField
                floatingLabelText="Melding"
                floatingLabelStyle={floatingLabelColor}
                name="melding"
                id="melding"
                value={melding}
                onChange={(event, index, value) => this.handleChangeSelect("melding", event, index, value)}
              >
                <MenuItem value={"Bodemverontreiniging"} primaryText="Bodemverontreiniging" />
                <MenuItem value={"Ladingverlies"} primaryText="Ladingverlies" />
                <MenuItem value={"Ongeval"} primaryText="Ongeval" />
                <MenuItem value={"Wateroverlast"} primaryText="Wateroverlast" />
                <MenuItem value={"Weginfrastructuur"} primaryText="Weginfrastructuur" />
                <MenuItem value={"Andere"} primaryText="Andere" />
              </SelectField>
            </div>
            <div className={andereMeldingShow}>
              <TextField
                hintText="Andere"
                floatingLabelText="Andere"
                name="andereMelding"
                onChange={this.handleChange}
                value={andereMelding}
              />
            </div>
          </div>
          <div style={{display:"flex"}}>
            <div>
              <TextField
                hintText="Weg"
                floatingLabelText="Weg"
                floatingLabelStyle={floatingLabelColor}
                name="weg"
                onChange={this.handleChange}
                value={weg}
              />
            </div>
            <div>
              <TextField
                hintText="Gemeente of Postcode"
                floatingLabelText="Grondgebied"
                floatingLabelStyle={floatingLabelColor}
                name="grondgebied"
                onChange={this.handleChange}
                value={grondgebied}
              />
            </div>
            <div>
              <TextField
                hintText="Rijrichting"
                floatingLabelText="Rijrichting"
                floatingLabelStyle={floatingLabelColor}
                name="rijrichting"
                onChange={this.handleChange}
                value={rijrichting}
              />
            </div>
          </div>
          <div style={{display:"flex"}}>
            <div>
              <TextField
                hintText="Gewestweg"
                floatingLabelText="Gewestweg"
                floatingLabelStyle={floatingLabelColor}
                name="gewestweg"
                onChange={this.handleChange}
                value={gewestweg}
              />
            </div>
            <div>
              <SelectField
                floatingLabelText="Richting"
                floatingLabelStyle={floatingLabelColor}
                name="richting"
                id="richting"
                value={richting}
                onChange={(event, index, value) => this.handleChangeSelect("richting", event, index, value)}
              >
                <MenuItem value={"Aflopend"} primaryText="Aflopend" />
                <MenuItem value={"Oplopend"} primaryText="Oplopend" />
              </SelectField>
            </div>
          </div>
          <div style={{display:"flex"}}>
            <div>
              <TextField
                hintText="km punt van"
                floatingLabelText="Km punt van"
                floatingLabelStyle={floatingLabelColor}
                name="kmPuntVan"
                onChange={this.handleChange}
                value={kmPuntVan}
                type="number"
              />
            </div>
            <div>
              <TextField
                hintText="km punt tot"
                floatingLabelText="Km punt tot"
                floatingLabelStyle={floatingLabelColor}
                name="kmPuntTot"
                onChange={this.handleChange}
                value={kmPuntTot}
                type="number"
              />
            </div>
          </div>
          <div style={{display:"flex"}}>
            <div>
              <TextField
                hintText="straat"
                floatingLabelText="Straat"
                floatingLabelStyle={floatingLabelColor}
                name="straat"
                onChange={this.handleChange}
                value={straat}
              />
            </div>
            <div>
              <TextField
                hintText="huisnummer"
                floatingLabelText="Huisnummer"
                floatingLabelStyle={floatingLabelColor}
                name="huisnummer"
                onChange={this.handleChange}
                value={huisnummer}
              />
            </div>
          </div>
          <div>
            <TextField
              hintText="Opmerking bereikbaarheid"
              floatingLabelText="Opmerking bereikbaarheid"
              floatingLabelStyle={floatingLabelColor}
              multiLine={true}
              rows={2}
              name="opmerkingBereikbaarheid"
              onChange={this.handleChange}
              value={opmerkingBereikbaarheid}
              style={{minWidth: "512px"}}
            />
          </div>
          <div style={{marginBottom:"25pt"}}>
            <RaisedButton
              label="Doorsturen"
              primary={true}
              onClick={this.submitForm}
            />
          </div>
        </Paper>
      </div>
    );
  }
}
FicheToevoegen.propTypes = {
};
