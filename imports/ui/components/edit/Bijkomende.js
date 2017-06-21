// react imports
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const floatingLabelColor = {
  color: "#757575"
}
const itemStyle = {margin:'15px 0px 6px 0px', whiteSpace: 'pre-line'};
const textStyle = {whiteSpace: 'pre-line'};
export default class Bijkomende extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      bijkomende: this.props.fiche.bijkomende.text,
      mode: this.props.fiche.bijkomende.mode,
    };
  }
  componentWillMount  = () => {
    if(this.props.fiche.bijkomende.mode == 'view'){
      this.setState({'bijkomendeView': 'show', 'bijkomendeEdit':'hidden'});
    } else {
      this.setState({'bijkomendeView': 'hidden', 'bijkomendeEdit':'show'});
    }
  }
  handleChange = (event) => this.setState({"bijkomende": event.target.value});
  saveThis = () => {
    this.setState({'mode': 'view'})
    console.log(this.state.bijkomende);
    data = {'bijkomende': {'text': this.state.bijkomende, 'mode': 'view'}};
    Meteor.call('fiches.update', this.props.fiche._id, data);

  }
  setAsView = () => {
    this.setState({mode: 'edit'});
    Meteor.call('fiches.update', this.props.ficheId, {'bijkomende': {"mode": "edit"}});
  }
  render() {
    const { fiche } = this.props;
    return (
      <div>
        <section id="Bijkomende" className={(this.state.mode=='edit')? 'show': 'hidden'}>
          <div style={{position: 'absolute', top:'15px', right:"60px", zIndex:"1005"}}>
            <RaisedButton  className={this.props.className} label="Categorie bewaren" primary={true} onClick={this.saveThis} />
          </div>
          <TextField
            floatingLabelText="Bijkomende Details Vaststellingen - Acties - Uitvoering - ..."
            multiLine={true}
            rows={3}
            name="Opmerkingen"
            style={{minWidth:"512px", maxWidth:"80%"}}
            value={this.state.bijkomende}
            onChange={this.handleChange}
            floatingLabelStyle={floatingLabelColor}
          />
        </section>
        <section id="Bijkomende_view" className={(this.state.mode=='view')? 'show': 'hidden'} style={{padding: '8px 0px 20px 0px'}}>
          <div style={{position: 'absolute', top:'15px', right:"60px", zIndex:"1005"}}>
            <RaisedButton label="Categorie bewerken" secondary={true} onClick={this.setAsView} />
          </div>
          <div style={itemStyle}>Bijkomende Details Vaststellingen - Acties - Uitvoering - ...</div>
          <div style={textStyle}><strong>{this.state.bijkomende}</strong></div>
        </section>
      </div>
    );
  }
}
